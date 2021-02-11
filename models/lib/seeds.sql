use stocktracker_db;

ALTER TABLE Users CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Users CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Stocks CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Stocks CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO Stocks (ticker, companyName, sector, shareCount, shareCost, currentPrice)
	VALUES ("ABC", "AB Company", "Misc", 10, 10.00, 20.00);

use stocktracker_db;
SELECT * FROM Stocks;