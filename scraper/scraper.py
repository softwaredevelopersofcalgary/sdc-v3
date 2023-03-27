import requests
from bs4 import BeautifulSoup
import re

# Send a request to the webpage
url = "https://www.meetup.com/software-developers-of-calgary/events/"
response = requests.get(url)

# Parse the HTML content of the page
soup = BeautifulSoup(response.content, "html.parser")

# Find the event listings on the page
# event_listings = soup.find_all("ul", class_="eventList-list")
event_listings = soup.find_all("div", class_="eventCard")

# print(event_listings)

# Extract the information for each event
for event in event_listings:
    location = event.find("div", class_="venueDisplay").text.strip()
    date = event.find("span", class_="eventTimeDisplay-startDate").text.strip()
    date_edited = re.sub('<span>|</span>', '', date)
    link = event.find("a", class_="eventCard--link")["href"]
    link = "https://www.meetup.com" + link

    # Print the information for each event
    print("Location:", location)
    print("Date:", date_edited)
    print("Link:", link)