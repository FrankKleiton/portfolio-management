 TODO:
[x] I need the Free Cash Flow CAGR
[x] Given just one cash flow, the free cash flow CAGR should be null
[x] Given more than one cash flow, the free cash flow cagr should be
 ((End Value / Initial Value)^(1/time) - 1)
[x] I also need the Book Value CAGR
[x] I need the average balance sheet
[x] create a special cashflow called AverageCashFlow
[x] the cashflow statement should be ordered by year(the average should be on the end)
[x] Calculate free cash flow yield

Future TODO
[x] calculate the cash conversion ratio of each year (operating cash flow ÷ operating profit)
[x] calculate the roce of each year (ebit / (total asset - current liabilities))
[x] Authentication
[x] Persist tickets on the database

[x] Create an asynchronous queue that goes through the tickets (because the)
scraps the cashflow data and persist in the database
[x] Refactor the stock-summaries usecase to get the cashflow data
from the database instead of statusinvest
[x] Associate all the data to the user logged in
[x] Add docker and docker-compose file
[x] Apply composite pattern on the view to clean up the code




