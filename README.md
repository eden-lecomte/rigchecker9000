# rigchecker9000
Android app to check bit pool API's for key stats that would indicate problems with your mining rig. 


# To do
- Input as many API services as required
- Enter pool name, wallet address, automated worker names
- Custom optimum hashrate per worker
- Custom threshold to send an alert
- Adjust refresh period
- Add manual refresh (pull down)

# Bugs
- Notifications not pushing if in background
- If rig goes offine, all 3 errors are logged
- Rig Offline DOM log content empty
- Double notifications in DOM log (could simply be duplicate events)
- Hashrate low triggering too often

# UI fixes 
- Entire name is posted in log, just need worker name (splice .)
- Add some nice styles to increase readability

