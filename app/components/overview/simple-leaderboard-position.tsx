import { LeaderboardEntry } from "@/lib/definitions";
import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "../ui/item";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type SimpleLeaderboardPositionProps = {
  person: LeaderboardEntry;
};

const tenKStocks = new Set<string>(["AMD", "NVDA"]);

export default function SimpleLeaderboardPosition({ person }: SimpleLeaderboardPositionProps) {
  return (
    <Item key={person.name}>
      <ItemContent>
        <ItemTitle className="font-semibold">{person.name}</ItemTitle>
        <ItemDescription className="line-clamp-none">
          {person.stocks.map((stock, index) => (
            <Fragment key={stock.symbol}>
              <Tooltip>
                <TooltipTrigger>{stock.symbol}</TooltipTrigger>
                <TooltipContent side="bottom">
                  {stock.name}:{" "}
                  <span
                    className={clsx(
                      (!tenKStocks.has(stock.symbol) && stock.value < 5000) ||
                        (tenKStocks.has(stock.symbol) && stock.value < 10000)
                        ? "text-destructive-tooltip"
                        : "text-success-tooltip",
                    )}
                  >
                    ${stock.value}
                  </span>
                </TooltipContent>
              </Tooltip>
              {index !== person.stocks.length - 1 && ", "}
            </Fragment>
          ))}

          {parseFloat(person.cash_balance) > 0 && (
            <>
              {", "}
              <Tooltip>
                <TooltipTrigger>Cash</TooltipTrigger>
                <TooltipContent side="bottom">Cash: ${person.cash_balance}</TooltipContent>
              </Tooltip>
            </>
          )}
        </ItemDescription>
      </ItemContent>
      <ItemActions>${person.total_value}</ItemActions>
    </Item>
  );
}
