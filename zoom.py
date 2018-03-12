# Required modules
import argparse
import requests
import re

# Just some colors and shit bro
white = '\033[97m'
green = '\033[1;32m'
red = '\033[1;31m'
yellow = '\033[1;33m'
end = '\033[1;m'
info = '\033[1;33m[!]\033[1;m'
que =  '\033[1;34m[?]\033[1;m'
bad = '\033[1;31m[-]\033[1;m'
good = '\033[1;32m[+]\033[1;m'
run = '\033[1;97m[~]\033[1;m'

parser = argparse.ArgumentParser() # defines the parser
parser.add_argument('-u', '--url', help='Target wordpress website') # Adding argument to the parser
args = parser.parse_args() # Parsing the arguments

print ('''%s  ____                
 /_  / ___  ___  ____ 
  / /_/ %s_ \/ _%s \/    \\
 /___/\___%s/\%s___/_/_/_/%s\n''' % (yellow, white, yellow, white, yellow, end))

usernames = [] # List for storing found usernames

def manual(url):
	print '%s Scan Started' % run
	for number in range(0, 9999):
		response = requests.get(url + '/?d3v=x&author=' + str(number)).text # Makes request to webpage
		match = re.search(r'/author/[^<]*/', response) # Regular expression to extract username
		if match:
			username = match.group().split('/author/')[1][:-4] # Taking what we need from the regex match
			print username.replace('/feed', '') # Print the username without '/feed', if present
			usernames.append(username) # Appending the username to usernames list
		else:
			if len(usernames) - number > 20: # A simple logic to be on the safe side
				if len(usernames) > 1:
					print '%s Looks like Zoom has found all the users. Exiting...' % info
					quit()
				else:
					print '%s Looks like there\'s some security measure in place. Exiting...' % bad
					quit()

if args.url:
	url = args.url # args.url contains value of -u option
	if 'http' not in url:
		url = 'http://' + url
	manual(url)
else:
	parser.print_help()

if usernames:
	for username in usernames:
		requests.get()
