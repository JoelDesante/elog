# ELOG
_A CLT Production_

*By Joel DeSante*

## What is ELOG
ELOG is a simple chrome extension that helps you more efficiently track "can't fix" violations. ELOG is short for **Error Logger**.

Essentially, this extension looks for Violations on aXe error pages. Then, when you open the extension and select an error, it will be added to a data store. Once you are done working, all you need to do is copy the table data and paste it into an Excel sheet.

## How do I install ELOG?
Installing ELOG is simple.

1. Download the source files and unzip.
2. Move the unzipped directory to location that can be easily found.
3. In chrome, type `chrome://extensions`. Then make sure Developer Mode is turned on.
	- On the top bar you will see `Load Unpacked`. Click that and select the unzipped folder.

Now when you load a aXe error page, all the violations will be scraped.

## How do I use ELOG?
When you come across an error that you cannot fix: 
1. Click the "C" icon in chromes top bar.
2. Find the error/violation
3. Click add to list

When you want to copy the data to Excel:
1. Click the "C" icon in chromes top bar.
2. Click `Copy Table Data`. *(Copying table data will regen the table data and then copy it all)*
3. Paste into excel

Common Issue: **The Excel spreadsheet won't format the data!**
In this case, copy the data into a new spreadsheet and then copy and paste the formatted content to the stylized sheet.

## Missing Features and Notes
- ~~You currently cannot remove a single item from the list. It will be added soon.~~ [ADDED]
- You need to type your name into the text box before you copy the data. Otherwise no name will be associated with the unfixables.
