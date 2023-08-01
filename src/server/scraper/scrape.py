from dotenv import load_dotenv
load_dotenv()

import requests
from bs4 import BeautifulSoup
import re
import os
import MySQLdb
from datetime import datetime

connection = MySQLdb.connect(
  host= os.getenv("HOST"),
  user=os.getenv("USERNAME"),
  passwd= os.getenv("PASSWORD"),
  db= os.getenv("DATABASE"),
  autocommit = True,
  ssl_mode = "VERIFY_IDENTITY",
  ssl      = {
    "ca": "/etc/ssl/cert.pem"
  }
)
# set up connection to the database
cursor = connection.cursor()




# Send a request to the webpage
url = "https://www.meetup.com/software-developers-of-calgary/events/"
response = requests.get(url)

# Parse the HTML content of the page
soup = BeautifulSoup(response.content, "html.parser")

# Find the event listings on the page
# event_listings = soup.find_all("ul", class_="eventList-list")
event_listings = soup.find_all("div", class_="eventCard")

# print(event_listings)

counter = 1;
# Extract the information for each event
for event in event_listings:
    name = "Mini Hackathon"
    description = "Mini Hackathon"
    startTime = "10:00 AM"
    image = ""
    isFeatured = True

    location = event.find("div", class_="venueDisplay").text.strip()
    date = event.find("span", class_="eventTimeDisplay-startDate").text.strip()
    date_edited = re.sub('<span>|</span>', '', date)
    
    # Convert to a datetime object using strptime with the correct format
    date_obj = datetime.strptime(date_edited, '%a, %b %d, %Y, %I:%M %p %Z')

    # Format the datetime object in the MySQL-compatible format
    mysql_date_str = date_obj.strftime('%Y-%m-%d %H:%M:%S')
        
    link = event.find("a", class_="eventCard--link")["href"]
    link = "https://www.meetup.com" + link

    updatedAt = datetime.now()
    # Print the information for each event
    print("Location:", location)
    print("Date:", date_edited)
    print("Link:", link)
    insert_query = """ INSERT INTO Event (id, name, date, location, description, startTime, image, isFeatured, updatedAt) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    record_to_insert = (counter, name, mysql_date_str, location, description, startTime, image,isFeatured, updatedAt)
    cursor.execute(insert_query, record_to_insert)

    connection.commit()

    counter += 1

cursor.close()
connection.close()