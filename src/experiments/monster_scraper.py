"""
The following script is designed to scrape dndbeyond for any and all available monsters.
Theoretically, this could be extended to scrape spells, items, weapons, and other gear as well.
"""

from bs4 import BeautifulSoup
from urllib.request import urlopen

url = "https://www.dndbeyond.com/monsters"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

print(soup.get_text())