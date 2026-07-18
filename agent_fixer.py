import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

# 1. Đọc file lỗi và log lỗi từ môi trường GitHub
file_path = "duong_dan_file_loi.py" 
error_log = os.getenv("ERROR_LOG")

with open(file_path, "r") as f:
    bad_code = f.read()

# 2. Gửi yêu cầu cho AI Agent
prompt = f"Code này bị lỗi.\nLog lỗi: {error_log}\n\nCode hiện tại:\n{bad_code}\nHãy sửa lại code và CHỈ TRẢ VỀ nội dung code mới, không giải thích."

response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}]
)

fixed_code = response.choices[0].message.content

# 3. Ghi đè lại file đã sửa
with open(file_path, "w") as f:
    f.write(fixed_code)