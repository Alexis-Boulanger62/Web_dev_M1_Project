import { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Modal,
  Select,
  Space,
  Typography,
  Popconfirm,
  DatePicker,
} from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useSalesProvider } from '../providers/useSalesProvider'
import { useClientProvider } from '../../clients/providers/useClientProvider.tsx'
import { useBookProvider } from '../../books/providers/useBookProvider'

export const SaleList = () => {
  const { sales, loadSales, createSale, deleteSale } = useSalesProvider()
  const { clients, loadClients } = useClientProvider()
  const { books, loadBooks } = useBookProvider()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState<string>()
  const [selectedBookId, setSelectedBookId] = useState<string>()
  const [selectedDate, setSelectedDate] = useState<string>()

  useEffect(() => {
    loadSales()
    loadClients()
    loadBooks()
  }, [])

  const handleAddSale = async () => {
    if (selectedClientId && selectedBookId && selectedDate) {
      await createSale({
        clientId: selectedClientId,
        bookId: selectedBookId,
        purchaseDate: selectedDate,
      })
      setIsModalOpen(false)
      setSelectedBookId(undefined)
      setSelectedClientId(undefined)
      setSelectedDate(undefined)
      loadSales()
    }
  }

  return (
    <Space direction="vertical" style={{ width: '95%', textAlign: 'left' }}>
      <Typography.Title level={1}>Sales</Typography.Title>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Add Sale
      </Button>

      <Table
        dataSource={sales}
        rowKey="id"
        columns={[
          {
            title: 'Client',
            dataIndex: ['client', 'name'],
            key: 'client',
            render: (_, record) =>
              `${record.client.firstName} ${record.client.name}`,
          },
          {
            title: 'Book',
            dataIndex: ['book', 'title'],
            key: 'book',
          },
          {
            title: 'Date',
            dataIndex: 'purchaseDate',
            key: 'purchaseDate',
            render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Popconfirm
                title="Delete this sale?"
                onConfirm={() => deleteSale(record.id).then(loadSales)}
              >
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>
            ),
          },
        ]}
      />

      <Modal
        title="Add Sale"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddSale}
        okButtonProps={{
          disabled: !selectedClientId || !selectedBookId || !selectedDate,
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
          />
          <Select
            placeholder="Select a book"
            options={books.map(b => ({
              label: b.title,
              value: b.id,
            }))}
            onChange={value => setSelectedBookId(value)}
          />
          <DatePicker onChange={date => setSelectedDate(date.toString())} />
        </Space>
      </Modal>
    </Space>
  )
}
