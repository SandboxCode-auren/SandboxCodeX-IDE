import Grid from "../components/layout/Grid";
import DashboardGrid from "../components/layout/DashboardGrid";
import Logo from "../components/brand/Logo";
import Drawer from "../components/navigation/Drawer";
import Hamburger from "../components/navigation/Hamburger";
import UserMenu from "@/components/auth/UserMenu";
import Panel from "../components/ui/Panel";
import RepositoryList from "../components/repository/RepositoryList";

export default function Home() {
  return (
    <>
      <Grid />

      <main
        style={{
          maxWidth: 430,
          margin: "0 auto",
          padding: 20,
          position: "relative",
          zIndex: 1,
        }}
      >
        <header
          style={{
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #393939",
          }}
        >
          <Hamburger />

          <Logo />

          <UserMenu />
        </header>

        <Drawer />

        <DashboardGrid>
          <Panel title="WORKSPACE">
            <div>Workspace đang sẵn sàng.</div>
          </Panel>

          <Panel title="REPOSITORIES">
            <RepositoryList />
          </Panel>

          <Panel title="RUNTIME">
            Runtime: READY
          </Panel>

          <Panel title="TASK QUEUE">
            Không có task.
          </Panel>

          <Panel title="TIMELINE">
            Chưa có hoạt động.
          </Panel>

          <Panel title="ARTIFACTS">
            Chưa có artifact.
          </Panel>

          <Panel title="TERMINAL">
            <pre
              style={{
                margin: 0,
                fontFamily: "IBM Plex Mono",
              }}
            >
{`$ SandboxCodeX

System Ready`}
            </pre>
          </Panel>
        </DashboardGrid>
      </main>
    </>
  );
}
