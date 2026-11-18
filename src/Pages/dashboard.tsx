import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import MedDetails from '../modules/dashboard/details'
import { auth } from '../Firebase/config'
import { fetchMedications } from '../lib/utilqueries.ts/medicationquery'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Package } from 'lucide-react'
import { useAuth } from '../Firebase/auth-context'
import UniversalOverlay from '../components/layout/universal-overlay'
import EditMedicationForm from '../modules/Medication/edit-medication'
import type { Medication } from '../lib/type'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
  const [isEdit, setIsEdit] = useState<Medication | null>(null)
  const { userId, loading } = useAuth()
  const { t } = useTranslation()

  const {
    data: medications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['medications', userId],
    queryFn: () => fetchMedications(userId!),
    enabled: !!userId || !loading,
  })

  const todaysMedications = useMemo(
    () =>
      medications?.filter((med) => {
        const createdOrStartsToday =
          new Date(med?.medStart ?? '').toDateString() ===
            new Date().toDateString() ||
          med?.createdAt?.toDate().toDateString() === new Date().toDateString()
        return createdOrStartsToday && med?.isTaken === false
      }),
    [medications],
  )

  const takenMedications = useMemo(
    () =>
      todaysMedications?.filter((med) => {
        return med?.isTaken === true
      }),
    [todaysMedications],
  )

  const notTakenMedications = useMemo(
    () =>
      todaysMedications?.filter((med) => {
        return med?.isTaken === false
      }),
    [todaysMedications],
  )

  // const calculateAdherencePercentage = takenMedications
  const adherencePercentage =
    todaysMedications?.length > 0
      ? (takenMedications?.length / todaysMedications?.length) * 100
      : 0
  //use interval and updatedAt to determine next medication and time until next medication

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={40} className="animate-spin" />
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-4xl">
        {t('error')}
      </div>
    )
  }

  return (
    <>
      <div className="lg:ml-52 pt-18 lg:pt-14 px-4  ">
        <div className="pb-8 ">
          <h1 className="text-xl lg:text-3xl font-semibold">
            {' '}
            {t('dashboard')}
          </h1>
          <span className="text[12px] text-[#141414]">
            {t('welcome')} <strong>{auth.currentUser?.displayName}</strong>,{' '}
            {t('description')}
          </span>
        </div>
        <div className="lg:grid lg:grid-cols-4 gap-4 items-start">
          <article className="bg-white lg:col-span-3 rounded-md p-4 border border-[#bdbdbd]  max-w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
              <div className="text-sm">
                <strong className="block text-[#141414] font-medium">
                  {t('today')}
                </strong>
                {todaysMedications?.length > 0 && (
                  <>
                    <span className="text-[12px]">
                      {takenMedications?.length} of {todaysMedications?.length}{' '}
                      {t('taken')}
                    </span>
                    <span className="text-[12px]">
                      {t('next')} {notTakenMedications[0]?.medName}{' '}
                      {t('toBeTaken')}
                      {notTakenMedications[0]?.medInterval}
                    </span>
                  </>
                )}
              </div>
              <Link
                to="/medications"
                className="bg-[#48a5fc] hover:opacity-50 p-2 text-white rounded-md text-[12px] lg:text-sm w-fit"
              >
                + {t('addMedication')}
              </Link>
            </div>

            {todaysMedications.length === 0 ? (
              <div className="flex  flex-col items-center justify-center h-screen text-gray-600">
                <Package size={100} />
                <span> {t('dontHaveMedication')}.</span>
              </div>
            ) : (
              <article className="pt-4 flex flex-col gap-5">
                {/* items */}
                {todaysMedications?.map((med) => {
                  return (
                    <MedDetails
                      med={med}
                      key={med?.id}
                      setIsOpen={() => setIsEdit(med)}
                    />
                  )
                })}
              </article>
            )}
          </article>
          <div className="bg-white rounded-md p-4 border border-[#bdbdbd] text-sm mt-4 lg:mt-0">
            <span className="font-semibold  ">{t('todaysAdherence')}</span>
            <span className="block font-semibold text-center pt-4 text-xl">
              {adherencePercentage}%
            </span>
            <div className="text-[#bdbdbd] text-[12px] text-center block pb-2">
              {adherencePercentage > 20 ? (
                <span>{t('onTrack')}</span>
              ) : adherencePercentage === 0 ? (
                <span>{t('notTakenToday')}</span>
              ) : (
                <span>{t('needsImprove')}</span>
              )}
            </div>
            <div className="rounded-full h-1.5 bg-[#bdbdbd]">
              <div
                className="bg-[#6FA8DC] rounded-l-full h-full"
                style={{ width: `${adherencePercentage}%` }}
              ></div>
            </div>
            <div className="text-[#bdbdbd] flex justify-between text-[12px] pt-2">
              <span>{takenMedications?.length} {t("taken")}</span>
              <span>{notTakenMedications?.length} {t("remaining")}</span>
            </div>
          </div>
        </div>
      </div>

      <UniversalOverlay
        isOpen={isEdit !== null}
        setIsOpen={() => setIsEdit(null)}
      />
      <EditMedicationForm
        editMed={isEdit !== null}
        setEditMed={() => setIsEdit(null)}
        existingMed={isEdit}
      />
    </>
  )
}

export default Dashboard
