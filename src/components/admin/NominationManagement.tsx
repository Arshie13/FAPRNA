"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Award, 
  Calendar, 
  Users, 
  Settings,
  Play,
  Square,
  Plus,
  Check,
  X
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import {
  getNominationSettings,
  toggleNomination,
  getAllNominationYears,
  createNominationYear,
  getNominationStats
} from "@/lib/actions/nomination-settings-action"
import {
  getAllNominations,
  updateNominationStatus
} from "@/lib/actions/nomination-actions"

interface NominationSettings {
  id: string
  year: number
  isNominationOpen: boolean
  nominationStartDate: Date | null
  nominationEndDate: Date | null
  createdAt: Date
  updatedAt: Date
}

interface Nomination {
  id: string
  nominee: {
    fullName: string
  }
  nominator: {
    fullName: string
  }
  category: string
  createdAt: string | Date
  status: "PENDING" | "APPROVED" | "REJECTED"
  reason: string
}

    interface NominationStats {
    totalNominations: number
    categories: {
      intentionality: number
      inquiry: number
      impact: number
      [key: string]: number
    }
  }


export default function NominationManagement() {
    const [stats, setStats] = useState<NominationStats>({
    totalNominations: 0,
    categories: {
      intentionality: 0,
      inquiry: 0,
      impact: 0
    }
  })
  const [settings, setSettings] = useState<NominationSettings | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nominationYears, setNominationYears] = useState<NominationSettings[]>([])
  const [nominations, setNominations] = useState<Nomination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isToggling, setIsToggling] = useState(false)
  const [newYear, setNewYear] = useState<string>("")

  useEffect(() => {
    fetchData()
  }, [])

const fetchData = async () => {
  setIsLoading(true)
  try {
    const [settingsData, yearsData, nominationsData, statsData] = await Promise.all([
      getNominationSettings(),
      getAllNominationYears(),
      getAllNominations(),
      getNominationStats()
    ])
    
    setSettings(settingsData)
    setNominationYears(yearsData)
    setNominations(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nominationsData.map((nom: any) => ({
        ...nom,
        status: nom.status as "PENDING" | "APPROVED" | "REJECTED"
      }))
    )
    setStats({
      ...statsData,
      categories: {
        intentionality: statsData.categories.intentionality ?? 0,
        inquiry: statsData.categories.inquiry ?? 0,
        impact: statsData.categories.impact ?? 0,
        ...statsData.categories
      }
    })
  } catch (error) {
    console.error("Failed to fetch data:", error)
    toast.error("Failed to load nomination data")
  } finally {
    setIsLoading(false)
  }
}

  const handleToggleNomination = async (isOpen: boolean) => {
    setIsToggling(true)
    try {
      const result = await toggleNomination(isOpen)
      
      if (result.success) {
        toast.success(isOpen ? "Nominations opened!" : "Nominations closed!")
        await fetchData()
      } else {
        toast.error(result.error || "Failed to toggle nominations")
      }
    } catch (error) {
      console.error("Failed to toggle nominations:", error)
      toast.error("Failed to toggle nominations")
    } finally {
      setIsToggling(false)
    }
  }

  const handleCreateYear = async () => {
    if (!newYear || isNaN(parseInt(newYear))) {
      toast.error("Please enter a valid year")
      return
    }

    try {
      const result = await createNominationYear(parseInt(newYear))
      
      if (result.success) {
        toast.success(`Nomination year ${newYear} created!`)
        setNewYear("")
        await fetchData()
      } else {
        toast.error(result.error || "Failed to create nomination year")
      }
    } catch (error) {
      console.error("Failed to create year:", error)
      toast.error("Failed to create nomination year")
    }
  }

  const handleUpdateStatus = async (nominationId: string, status: string) => {
    try {
      const result = await updateNominationStatus(nominationId, status)
      
      if (result.success) {
        toast.success(`Nomination ${status.toLowerCase()}!`)
        await fetchData()
      } else {
        toast.error(result.error || "Failed to update nomination")
      }
    } catch (error) {
      console.error("Failed to update nomination:", error)
      toast.error("Failed to update nomination")
    }
  }

  const getCategoryTitle = (category: string) => {
    const titles = {
      'intentionality': 'ADVANCEMENT OF INTENTIONALITY',
      'inquiry': 'ADVANCEMENT IN INQUIRY',
      'impact': 'ADVANCEMENT WITH IMPACT'
    }
    return titles[category as keyof typeof titles] || category
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Nomination Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Current Nomination Status ({settings?.year})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">
                  Nomination Period
                </Label>
                <p className="text-sm text-gray-600">
                  {settings?.isNominationOpen ? "Nominations are currently open" : "Nominations are currently closed"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={settings?.isNominationOpen ? "default" : "secondary"}>
                  {settings?.isNominationOpen ? "Open" : "Closed"}
                </Badge>
                <Switch
                  checked={settings?.isNominationOpen || false}
                  onCheckedChange={handleToggleNomination}
                  disabled={isToggling}
                />
              </div>
            </div>

            {settings?.isNominationOpen && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Nominations Active</span>
                </div>
                <p className="text-sm text-green-700">
                  Started: {settings.nominationStartDate ? format(new Date(settings.nominationStartDate), "PPP 'at' p") : "Unknown"}
                </p>
              </div>
            )}

            {!settings?.isNominationOpen && settings?.nominationEndDate && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <Square className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800">Nominations Closed</span>
                </div>
                <p className="text-sm text-red-700">
                  Ended: {format(new Date(settings.nominationEndDate), "PPP 'at' p")}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Nominations</p>
                <p className="text-2xl font-bold">{stats.totalNominations || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Intentionality</p>
                <p className="text-2xl font-bold">{stats.categories?.intentionality || 0}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inquiry</p>
                <p className="text-2xl font-bold">{stats.categories?.inquiry || 0}</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Impact</p>
                <p className="text-2xl font-bold">{stats.categories?.impact || 0}</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => handleToggleNomination(!settings?.isNominationOpen)}
              disabled={isToggling}
              className="w-full"
              variant={settings?.isNominationOpen ? "destructive" : "default"}
            >
              {settings?.isNominationOpen ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Close Nominations
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Open Nominations
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Create New Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="2026"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                min="2020"
                max="2030"
              />
              <Button onClick={handleCreateYear} disabled={!newYear}>
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Nominations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recent Nominations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nominations.map((nomination) => (
              <div key={nomination.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{nomination.nominee.fullName}</h4>
                    <p className="text-sm text-gray-600">{getCategoryTitle(nomination.category)}</p>
                    <p className="text-xs text-gray-500">
                      Nominated by {nomination.nominator.fullName} • {format(new Date(nomination.createdAt), "PPP")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      nomination.status === "APPROVED" ? "default" :
                      nomination.status === "REJECTED" ? "destructive" : "secondary"
                    }>
                      {nomination.status}
                    </Badge>
                    {nomination.status === "PENDING" && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(nomination.id, "APPROVED")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUpdateStatus(nomination.id, "REJECTED")}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{nomination.reason}</p>
              </div>
            ))}
            {nominations.length === 0 && (
              <p className="text-center text-gray-500 py-8">No nominations yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}