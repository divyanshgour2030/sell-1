import os
import glob

html_files = glob.glob('*.html')

sidebar_logo_old = """            <div class="sidebar__logo">
                <a href="index.html" class="logo-link">
                    <div class="logo-icon">
                        <span>Kv</span>
                    </div>
                    <div class="logo-text">
                        <h1>KALA VIHAAN</h1>
                        <span>& ASSOCIATES</span>
                        <p>INTERIOR DESIGN STUDIO</p>
                    </div>
                </a>
            </div>"""

sidebar_logo_new = """            <div class="sidebar__logo" style="padding: 20px 30px;">
                <a href="index.html" class="logo-link" style="justify-content: center;">
                    <img src="images/logo.png" alt="Kala Vihaan Logo" class="brand-logo" style="max-width: 100%; height: auto; max-height: 100px;">
                </a>
            </div>"""

mobile_logo_old = """                <a href="index.html" class="mobile-logo">
                    <div class="logo-icon">
                        <span>Kv</span>
                    </div>
                </a>"""

mobile_logo_new = """                <a href="index.html" class="mobile-logo">
                    <img src="images/logo.png" alt="Kala Vihaan Logo" class="brand-logo-mobile" style="height: 40px;">
                </a>"""

loader_logo_old = """            <div class="loader-logo">
                <span class="logo-k">Kv</span>
            </div>"""

loader_logo_new = """            <div class="loader-logo" style="border: none; width: auto; height: auto;">
                <img src="images/logo.png" alt="Kala Vihaan Logo" style="width: 150px; animation: pulse 1.5s infinite;">
            </div>"""

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace(sidebar_logo_old, sidebar_logo_new)
    content = content.replace(mobile_logo_old, mobile_logo_new)
    content = content.replace(loader_logo_old, loader_logo_new)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Updated HTML files')
