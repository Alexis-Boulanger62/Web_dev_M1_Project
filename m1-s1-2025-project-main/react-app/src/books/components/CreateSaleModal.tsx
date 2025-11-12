import { useState, useEffect } from 'react'
import { Modal, Select, DatePicker, Space } from 'antd'
import { useClientProvider } from '../../clients/providers/useClientProvider.tsx'
import { useSalesProvider } from '../../sales/providers/useSalesProvider.tsx'

interface AddSaleModalProps {
  isOpen: boolean
  onClose: () => void
  bookId: string
  onSaleAdded: () => void
}

export const AddSaleModal = ({
  isOpen,
  onClose,
  bookId,
  onSaleAdded,
}: AddSaleModalProps) => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { clients, loadClients } = useClientProvider()
  const { createSale } = useSalesProvider()

  useEffect(() => {
    loadClients()
  }, [])

  const handleAddSale = async () => {
    if (!selectedClientId || !selectedDate) return

    setIsSubmitting(true)
    try {
      await createSale({
        clientId: selectedClientId,
        bookId,
        purchaseDate: selectedDate,
      })
      onSaleAdded()
      onClose()
      setSelectedClientId(null)
      setSelectedDate(null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      title="Add Sale"
      open={isOpen}
      onCancel={onClose}
      onOk={handleAddSale}
      okText="Add Sale"
      confirmLoading={isSubmitting}
      okButtonProps={{
        disabled: !selectedClientId || !selectedDate,
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select
          placeholder="Select a client"
          options={clients.map(c => ({
            label: `${c.firstName} ${c.name}`,
            value: c.id,
          }))}
          onChange={value => setSelectedClientId(value)}
          value={selectedClientId ?? undefined}
        />
        <DatePicker
          style={{ width: '100%' }}
          onChange={date => setSelectedDate(date ? date.toISOString() : null)}
        />
      </Space>
    </Modal>
  )
}
