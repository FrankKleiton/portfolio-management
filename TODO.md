# TODO List

- [x] I need the Free Cash Flow CAGR
- [x] Given just one cash flow, the free cash flow CAGR should be null
- [x] Given more than one cash flow, the free cash flow CAGR should be ((End Value / Initial Value)^(1/time) - 1)
- [x] I also need the Book Value CAGR
- [x] I need the average balance sheet
- [x] Create a special cashflow called AverageCashFlow
- [x] The cashflow statement should be ordered by year (the average should be at the end)
- [x] Calculate free cash flow yield
- [x] Calculate the cash conversion ratio of each year (operating cash flow ÷ operating profit)
- [x] Calculate the ROCE of each year (EBIT / (total asset - current liabilities))
- [x] Implement Authentication
- [x] Persist tickets in the database
- [x] Create an asynchronous queue that processes the tickets, scrapes the cashflow data, and persists it in the database
- [x] Refactor the stock-summaries use case to get the cashflow data from the database instead of StatusInvest
- [x] Associate all the data with the logged-in user
- [x] Add Docker and Docker-compose file
- [x] Apply composite pattern on the view to clean up the code
- [x] Create a puppeteer gateway and turn it into a singleton then check if it's viable to summarize each stock in parallel using Promise.all.
