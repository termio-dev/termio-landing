import { Check, X, Minus } from "lucide-react";

function Cell({
  value,
  highlight,
}: {
  value: boolean | "partial";
  highlight?: boolean;
}) {
  if (value === true) {
    return (
      <Check
        className={`mx-auto h-4 w-4 ${highlight ? "text-green-400" : "text-green-400"}`}
      />
    );
  }
  if (value === "partial") {
    return <Minus className="mx-auto h-4 w-4 text-muted-foreground" />;
  }
  return <X className="mx-auto h-4 w-4 text-muted-foreground/30" />;
}

export function ComparisonTable({
  termioLabel,
  competitorLabel,
  rows,
}: {
  termioLabel: string;
  competitorLabel: string;
  rows: Array<{
    feature: string;
    termio: boolean | "partial";
    competitor: boolean | "partial";
  }>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground w-[280px]">
              Feature
            </th>
            <th className="text-center py-3 px-4 font-semibold text-amber">
              {termioLabel}
            </th>
            <th className="text-center py-3 px-4 font-medium text-muted-foreground">
              {competitorLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.feature}
              className={`border-b border-border ${i % 2 === 0 ? "bg-card/50" : ""}`}
            >
              <td className="py-3 px-4 text-foreground">{row.feature}</td>
              <td className="py-3 px-4 text-center">
                <Cell value={row.termio} highlight />
              </td>
              <td className="py-3 px-4 text-center">
                <Cell value={row.competitor} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
