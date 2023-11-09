import React from "react";
import { mustGetStrata } from "../../data/stratas";
import { NewWidgetForm } from "../../components/NewWidgetForm";
import { getWidgets } from "../../data/widgets/getWidgets";
import { Widget } from "../../components/Widget";

export const runtime = "edge";
// export const revalidate = false;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

export default async function Page() {
  const strata = await mustGetStrata();
  const widgets = await getWidgets(strata);

  // const staticGenerationAsyncStorage = (
  //   fetch as any
  // ).__nextGetStaticStore?.() as any;

  // const store = staticGenerationAsyncStorage?.getStore();

  // console.log(fetch, staticGenerationAsyncStorage, store);

  return (
    <div>
      <div>
        <h3>Add Widget</h3>
        <NewWidgetForm strataId={strata.id} />
      </div>

      <div>
        {widgets.map((widget) => (
          <Widget key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  );
}
