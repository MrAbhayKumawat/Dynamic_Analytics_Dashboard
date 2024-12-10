import UserManagementDashboard from '@/components/UserManagementDashboard'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagementDashboard />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

