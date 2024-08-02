# TODO List

- [ ] I need the Free Cash Flow CAGR
- [ ] Given just one cash flow, the free cash flow CAGR should be null
- [ ] Given more than one cash flow, the free cash flow CAGR should be ((End Value / Initial Value)^(1/time) - 1)
- [ ] I also need the Book Value CAGR
- [ ] I need the average balance sheet
- [ ] Create a special cashflow called AverageCashFlow
- [ ] The cashflow statement should be ordered by year (the average should be at the end)
- [ ] Calculate free cash flow yield
- [ ] Calculate the cash conversion ratio of each year (operating cash flow ÷ operating profit)
- [ ] Calculate the ROCE of each year (EBIT / (total asset - current liabilities))
- [ ] Implement Authentication
- [ ] Persist tickets in the database
- [ ] Create an asynchronous queue that processes the tickets, scrapes the cashflow data, and persists it in the database
- [ ] Refactor the stock-summaries use case to get the cashflow data from the database instead of StatusInvest
- [ ] Associate all the data with the logged-in user
- [ ] Add Docker and Docker-compose file
- [ ] Apply composite pattern on the view to clean up the code
- [ ] Create a puppeteer gateway and turn it into a singleton then check if it's viable to summarize each stock in parallel using Promise.all.
