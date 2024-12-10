'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, deleteUser } from '@/lib/slices/userSlice'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserManagementDashboard() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.user.list)
  const status = useSelector(state => state.user.status)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(results)
    setCurrentPage(1)
  }, [searchTerm, users])

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
  }

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>Error loading users</div>

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Management Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2">View Details</Button>
                  <Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className="mx-1"
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

