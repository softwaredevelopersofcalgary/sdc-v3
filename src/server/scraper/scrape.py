from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup
import re
import os
import MySQLdb
from datetime import datetime
import time
import random

load_dotenv()

def storeEvents(eventListings, cursor, connection):
  for event in eventListings:    
    date = event.find("time").text.strip()
    dateObj = formatDate(date)

    mysqlDateStr = dateObj.strftime('%Y-%m-%d %H:%M:%S') 
    startTime = dateObj.strftime('%I:%M %p')

    # if there's an event on that same day, then we take it out 
    if isEventInDB(cursor, connection, mysqlDateStr + ".000"):
      print("Event already in DB")
      continue

    cuid = generateCuid();

    isFeatured = True

    name = "Project-based Mini-Hackathon!"
    location = "Central Library, Calgary, AB"

    updatedAt = datetime.now()

    link = event["href"]

    description, imageUrl = getDescAndImgUrl(link)
    print ("Creating new event: ")
    print (mysqlDateStr)

    insertQuery = """ INSERT INTO Event (id, name, date, location, description, startTime, image, isFeatured, updatedAt) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    recordToInsert = (cuid, name, mysqlDateStr, location, description, startTime, imageUrl,isFeatured, updatedAt)
    
    cursor.execute(insertQuery, recordToInsert)
    connection.commit()

def formatDate(date):
  dateEdited = re.sub('<span>|</span>', '', date)
  if "MDT" in dateEdited:
    dateEdited = dateEdited.replace("MDT", "-0600")
  elif "MST" in dateEdited:
    dateEdited = dateEdited.replace("MST", "-0700")

  dateObj = datetime.strptime(dateEdited, '%a, %b %d, %Y, %I:%M %p %z')

  return dateObj

def isEventInDB(cursor, connection, date):
  query = """SELECT COUNT(*) FROM `Event` WHERE `date` = %s"""
  cursor.execute(query, (date,))

  result = cursor.fetchone()
  count = result[0]

  if count > 0:
      return True
  else:
      return False

def clearEventsDB(cursor, connection):
  cursor.execute("DELETE FROM Event")
  connection.commit()

def setUpDB():
  print (os.getenv("HOST"))
  connection = MySQLdb.connect(
    host= os.getenv("HOST"),
    user=os.getenv("USERNAME"),
    passwd= os.getenv("PASSWORD"),
    db= os.getenv("DATABASE"),
    autocommit = True,
    ssl_mode = "VERIFY_IDENTITY",
    ssl = {
      "ca": "./cert.pem"
    }
  )

  cursor = connection.cursor()
  return cursor, connection

def getEventData():
  url = "https://www.meetup.com/software-developers-of-calgary/events/"
  response = requests.get(url)
  soup = BeautifulSoup(response.content, "html.parser")
  regex = re.compile(
    r"https://www\.meetup\.com/software-developers-of-calgary/events/\d+/"
  )

  eventListings = soup.find_all("a", href=regex)

  return eventListings

# todo: make a generic function to handle this and the getEventData
def getDescAndImgUrl(eventLink):
  response = requests.get(eventLink)
  soup = BeautifulSoup(response.content, "html.parser")
  descriptionHtml = soup.find("div", class_="break-words")
  
  imageUrl = getImageUrl(soup)

  # for some reason, the description has a max of 191 characters on the DB
  # todo: change the description table to allow for more characters
  text_content = [p.get_text(strip=True) for p in descriptionHtml.find_all('p')][:191]
  description = ' '.join(text_content)

  return description, imageUrl

def getImageUrl(soup):
  image = soup.find("img", {"alt": "Photo of Software Developers of Calgary group"})
  imageUrl = image["src"] if image else ""

  return imageUrl

def generateCuid():
  timestamp = int(time.time() * 1000)
  randomPart = random.randint(0, 0xffffff)

  return f'c{timestamp:x}{randomPart:06x}'

def closeDB(cursor, connection):
  cursor.close()
  connection.close()

# MAIN:
print("Host: ")
print(os.getenv("HOST"))
cursor, connection = setUpDB()
eventListings = getEventData()
storeEvents(eventListings, cursor, connection)
closeDB(cursor, connection)
