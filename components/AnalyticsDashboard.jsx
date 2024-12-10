'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAnalytics } from '@/lib/slices/analyticsSlice'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsDashboard() {
  const dispatch = useDispatch()
  const analyticsData = useSelector(state => state.analytics.data)
  const status = useSelector(state => state.analytics.status)
  const [startDate, setStartDate] = useState('2023-01-01')
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedRegion, setSelectedRegion] = useState('All')

  useEffect(() => {
    dispatch(fetchAnalytics({ startDate, endDate, region: selectedRegion }))
  }, [startDate, endDate, selectedRegion, dispatch])

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>Error loading analytics data</div>
  if (!analyticsData) return null

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{analyticsData.totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{analyticsData.activeUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Deleted Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{analyticsData.deletedUsers}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="flex space-x-2">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Regions</SelectItem>
            <SelectItem value="North">North</SelectItem>
            <SelectItem value="South">South</SelectItem>
            <SelectItem value="East">East</SelectItem>
            <SelectItem value="West">West</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>User Registration Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.registrationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active vs Inactive Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={analyticsData.activeVsInactive} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Users by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.usersByRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

