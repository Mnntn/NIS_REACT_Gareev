import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetProductsQuery, type Product } from '../../entities/product';
import { useAppSelector } from '../../shared/lib/hooks';
import { selectPageSize } from '../../features/settings';
import { Card } from '../../shared/ui/Card';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageSize = useAppSelector(selectPageSize);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isFetching, error } = useGetProductsQuery({
    limit: pageSize,
    skip: currentPage * pageSize,
    search: searchTerm,
  });

  const showLoading = isLoading || (isFetching && !data);

  const totalPages = useMemo(() => {
    if (!data?.total) return 0;
    return Math.ceil(data.total / pageSize);
  }, [data?.total, pageSize]);

  const visiblePages = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum visible page buttons
    let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(0, endPage - maxVisible + 1);
    }

    // Add first page
    if (startPage > 0) {
      pages.push(0);
      if (startPage > 1) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages - 1);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (showLoading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{t('common.error')}: {(error as Error).message}</p>
        <Button onClick={() => window.location.reload()}>{t('common.retry')}</Button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="page-title">{t('products.title')}</h1>
        <div className="search-container">
          <Input
            placeholder={t('products.search')}
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            disabled={isFetching}
          />
        </div>
      </div>

      {isFetching && (
        <div className="fetching-indicator">
          <div className="spinner"></div>
          <span>{t('common.loading')}</span>
        </div>
      )}

      {!data?.products || data.products.length === 0 ? (
        <div className="empty-state">
          <p>{t('products.noProducts')}</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {data.products.map((product: Product) => (
              <Card
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-meta">
                    <span className="product-rating">⭐ {product.rating.toFixed(1)}</span>
                    <span className="product-stock">{t('products.stock')}: {product.stock}</span>
                  </div>
                  <p className="product-category">{product.category}</p>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <Button
                variant="secondary"
                size="small"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                {t('common.previous')}
              </Button>
              
              <div className="page-numbers">
                {visiblePages.map((page, index) =>
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
                  ) : (
                    <Button
                      key={`page-${page}`}
                      variant={currentPage === page ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => handlePageChange(page as number)}
                      className={currentPage === page ? 'page-button-active' : ''}
                    >
                      {(page as number) + 1}
                    </Button>
                  )
                )}
              </div>
              
              <Button
                variant="secondary"
                size="small"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                {t('common.next')}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
