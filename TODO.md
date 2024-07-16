 TODO:
[x] I need the Free Cash Flow CAGR
[x] Given just one cash flow, the free cash flow CAGR should be null
[x] Given more than one cash flow, the free cash flow cagr should be
 ((End Value / Initial Value)^(1/time) - 1)
[x] I also need the Book Value CAGR
[x] I need the average balance sheet
[x] create a special cashflow called AverageCashFlow
[x] each time an cashflow is added, the average cashflow must be recomputed
[x] the cashflow statement should be ordered by year(the average should be on the end)
[x] each time an balancesheet is added, the average balancesheet must be recomputed


 Future TODO
 [x] calculate the cash conversion ratio of each year (operating cash flow ÷ operating profit)
 [x] calculate the roce of each year (ebit / (total asset - current liabilities))
 [x] We are exposing the free cash flow, the total assets and the total liabilities by
 getters, chech how make these private and just return it on the right moment, is it okay to have
 them as getters and setters?
 [x] the analysts will know how to calculate the ratios
