"""Process multiple student documents and generate merit list"""
import json
import os
from pathlib import Path
from ocr_extractor import batch_extract, MarksheetExtractor, CertificateExtractor

class BatchProcessor:
    """Process and organize extracted data from multiple students"""
    
    def __init__(self, output_dir: str = 'extraction_results'):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.students_data = {}
    
    def process_marksheets(self, marksheet_folder: str) -> dict:
        """Process all marksheets in a folder"""
        print(f"Processing marksheets from {marksheet_folder}...")
        results = batch_extract(marksheet_folder, 'marksheet')
        
        for result in results:
            if result.get('status') == 'success':
                roll_no = result.get('roll_number', 'unknown')
                if roll_no not in self.students_data:
                    self.students_data[roll_no] = {}
                self.students_data[roll_no]['marksheet'] = result
        
        return results
    
    def process_certificates(self, certificate_folder: str) -> dict:
        """Process all certificates in a folder"""
        print(f"Processing certificates from {certificate_folder}...")
        results = batch_extract(certificate_folder, 'certificate')
        
        for result in results:
            if result.get('status') == 'success':
                # Assuming certificate filename contains roll number
                roll_no = result.get('file_name', '').split('_')[0]
                if roll_no not in self.students_data:
                    self.students_data[roll_no] = {}
                
                if 'certificates' not in self.students_data[roll_no]:
                    self.students_data[roll_no]['certificates'] = []
                self.students_data[roll_no]['certificates'].append(result)
        
        return results
    
    def calculate_total_points(self, roll_no: str) -> float:
        """Calculate total points for a student"""
        total = 0
        
        if roll_no in self.students_data:
            # Points from marksheet
            if 'marksheet' in self.students_data[roll_no]:
                total += self.students_data[roll_no]['marksheet'].get('points', 0)
            
            # Points from certificates
            if 'certificates' in self.students_data[roll_no]:
                for cert in self.students_data[roll_no]['certificates']:
                    total += cert.get('points', 0)
        
        return total
    
    def generate_merit_list(self) -> list:
        """Generate sorted merit list"""
        merit_list = []
        
        for roll_no, data in self.students_data.items():
            total_points = self.calculate_total_points(roll_no)
            
            marksheet_data = data.get('marksheet', {})
            entry = {
                'roll_number': roll_no,
                'student_name': marksheet_data.get('student_name', 'Unknown'),
                'course': marksheet_data.get('course', 'Unknown'),
                'cgpa': marksheet_data.get('cgpa', 0),
                'total_points': total_points,
                'marksheet_points': marksheet_data.get('points', 0),
                'certificate_count': len(data.get('certificates', [])),
                'certificates_points': sum(c.get('points', 0) for c in data.get('certificates', []))
            }
            merit_list.append(entry)
        
        # Sort by total points (descending)
        merit_list.sort(key=lambda x: x['total_points'], reverse=True)
        
        # Add rank
        for rank, entry in enumerate(merit_list, 1):
            entry['rank'] = rank
        
        return merit_list
    
    def save_results_json(self, filename: str = 'extraction_results.json'):
        """Save all extracted data to JSON"""
        output_path = self.output_dir / filename
        with open(output_path, 'w') as f:
            json.dump(self.students_data, f, indent=2)
        print(f"Results saved to {output_path}")
    
    def save_merit_list_json(self, filename: str = 'merit_list.json'):
        """Save merit list to JSON"""
        merit_list = self.generate_merit_list()
        output_path = self.output_dir / filename
        with open(output_path, 'w') as f:
            json.dump(merit_list, f, indent=2)
        print(f"Merit list saved to {output_path}")
    
    def save_merit_list_csv(self, filename: str = 'merit_list.csv'):
        """Save merit list to CSV"""
        import csv
        merit_list = self.generate_merit_list()
        output_path = self.output_dir / filename
        
        if merit_list:
            with open(output_path, 'w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=merit_list[0].keys())
                writer.writeheader()
                writer.writerows(merit_list)
        print(f"Merit list CSV saved to {output_path}")


if __name__ == "__main__":
    processor = BatchProcessor()
    
    # Process documents
    processor.process_marksheets('marksheets')
    processor.process_certificates('certificates')
    
    # Save results
    processor.save_results_json()
    processor.save_merit_list_json()
    processor.save_merit_list_csv()
    
    # Print merit list
    print("\n" + "="*80)
    print("MERIT LIST")
    print("="*80)
    merit_list = processor.generate_merit_list()
    for student in merit_list[:10]:  # Show top 10
        print(f"{student['rank']:2}. {student['student_name']:30} | Roll: {student['roll_number']:10} | Points: {student['total_points']}")
