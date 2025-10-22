import React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books'
import { Space, Menu, Breadcrumb, type MenuProps } from 'antd'
import { BookOutlined, HomeOutlined, InfoOutlined } from '@ant-design/icons'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const router = useRouterState()
  const path = router.location.pathname

  // Définition du menu du haut
  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  // Génération simple du breadcrumb selon la route
  const parts = path.split('/').filter(Boolean)
  const breadcrumbItems =
    parts.length === 0
      ? [{ title: 'Home' }]
      : parts.map((part, index) => {
          const url = '/' + parts.slice(0, index + 1).join('/')
          const isLast = index === parts.length - 1
          const name = part.charAt(0).toUpperCase() + part.slice(1)
          return {
            title: isLast ? <span>{name}</span> : <Link to={url}>{name}</Link>,
          }
        })

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      {/* Header avec menu */}
      <div
        style={{
          textAlign: 'left',
          width: '100%',
          backgroundColor: '#395E66',
          color: 'white',
        }}
      >
        <h2 style={{ marginTop: 0, marginLeft: 16 }}>Babel&apos;s Library</h2>
        <Menu
          mode="horizontal"
          theme="dark"
          style={{ backgroundColor: '#395E66' }}
          selectedKeys={[
            path.startsWith('/books')
              ? 'books'
              : path.startsWith('/about')
              ? 'about'
              : 'home',
          ]}
          items={items}
        />
      </div>

      {/* Contenu + breadcrumb */}
      <div style={{ width: '100%', overflowY: 'scroll', padding: 16 }}>
        <Breadcrumb
          items={breadcrumbItems}
          style={{ marginBottom: 16, fontSize: 15 }}
        />
        {children}
      </div>
    </Space>
  )
}
