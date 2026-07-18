import Explorer from "@/components/explorer/Explorer";

export default function ExplorerPage(){

  return(
    <main
      style={{
        maxWidth:900,
        margin:"30px auto",
        padding:20
      }}
    >
      <h1>Explorer</h1>

      <Explorer/>
    </main>
  );

}
