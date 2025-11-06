"""Setup script to install Tesseract and Python dependencies"""
import subprocess
import sys
import os
from pathlib import Path

def check_tesseract():
    """Check if Tesseract is installed"""
    try:
        result = subprocess.run(['tesseract', '--version'], capture_output=True, text=True)
        print("Tesseract is already installed:")
        print(result.stdout)
        return True
    except FileNotFoundError:
        return False

def install_tesseract():
    """Install Tesseract OCR based on OS"""
    system = sys.platform
    
    if system == 'darwin':  # macOS
        print("Installing Tesseract on macOS...")
        subprocess.run(['brew', 'install', 'tesseract'], check=True)
    elif system == 'linux':
        print("Installing Tesseract on Linux...")
        subprocess.run(['sudo', 'apt-get', 'update'], check=True)
        subprocess.run(['sudo', 'apt-get', 'install', '-y', 'tesseract-ocr'], check=True)
    elif system == 'win32':
        print("For Windows, download installer from: https://github.com/UB-Mannheim/tesseract/wiki")
        print("Or run: choco install tesseract")
    else:
        print(f"Unknown OS: {system}")

def install_dependencies():
    """Install Python dependencies"""
    print("Installing Python dependencies...")
    req_file = Path(__file__).parent / 'requirements.txt'
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', str(req_file)], check=True)

def main():
    print("OCR Setup Script")
    print("=" * 50)
    
    if not check_tesseract():
        print("Tesseract not found. Installing...")
        install_tesseract()
    
    print("\nInstalling Python dependencies...")
    install_dependencies()
    
    print("\n" + "=" * 50)
    print("Setup complete!")
    print("\nUsage: python ocr_extractor.py <file_path> <doc_type>")
    print("  doc_type: 'marksheet' or 'certificate'")

if __name__ == "__main__":
    main()
