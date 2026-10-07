import PyPDF2

def extract_text(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                t = page.extract_text()
                if t:
                    text += t + "\n"
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
    return text

portfolio = extract_text("ARYAN PORTFOLIO FINAL.pdf")
completed = extract_text("Completed projects.pdf")

with open("pdf_extract.txt", "w", encoding="utf-8") as f:
    f.write("=== ARYAN PORTFOLIO ===\n")
    f.write(portfolio)
    f.write("\n\n=== COMPLETED PROJECTS ===\n")
    f.write(completed)

print("Done extracting!")
