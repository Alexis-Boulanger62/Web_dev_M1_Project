import { Skeleton, Space, Table, Typography } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)

  useEffect(() => {
    loadBook()
  }, [id])

  if (isLoading || !book) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <Typography.Title level={1}>{book?.title}</Typography.Title>
      <Typography.Title level={3}>{book?.yearPublished}</Typography.Title>
      <Typography.Title level={3}>
        By {book?.author.firstName} {book?.author.lastName}
      </Typography.Title>
      <h3>Client List</h3>
      <Table
        dataSource={book.sales}
        rowKey="id"
        pagination={false}
        columns={[
          {
            title: 'Client',
            render: (_, record) =>
              `${record.client.firstName} ${record.client.name}`,
          },
          {
            title: 'Purchase Date',
            dataIndex: 'purchaseDate',
          },
        ]}
      />
    </Space>
  )
}
