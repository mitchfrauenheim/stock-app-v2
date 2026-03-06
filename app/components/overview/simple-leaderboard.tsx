import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "../ui/item";

const sampleData = [
  {
    name: "Mitch",
    amount: "20000.00",
    stocks: "C, TSLA, AAPL",
  },
  {
    name: "Bill",
    amount: "19000.00",
    stocks: "NVDA, AMZ, MSFT, Cash",
  },
];

export default function SimpleLeaderboard() {
  return (
    <div className="w-full lg:w-2xs flex flex-col lg:border-r dashed-vertical">
      <div className="p-4 flex flex-col">
        <div className="pb-2">
          <h2 className="text-lg font-semibold font-sans">Leaderboard</h2>
        </div>
        <div className="flex flex-col overflow-scroll">
          <ItemGroup className="gap-0">
            {sampleData.map((person) => (
              <Item key={person.name}>
                <ItemContent>
                  <ItemTitle className="font-semibold">{person.name}</ItemTitle>
                  <ItemDescription>{person.stocks}</ItemDescription>
                </ItemContent>
                <ItemActions>{person.amount}</ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </div>
    </div>
  );
}
