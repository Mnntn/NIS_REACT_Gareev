import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetProductByIdQuery } from '../../entities/product';
import { Button } from '../../shared/ui/Button';
import { Card } from '../../shared/ui/Card';
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  if (error || !product) {
    return (
      <div className="error">
        <p>{t('common.error')}: Product not found</p>
        <Button onClick={() => navigate('/products')}>
          {t('products.backToProducts')}
        </Button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Button 
        variant="secondary" 
        size="small" 
        onClick={() => navigate('/products')}
        className="back-button"
      >
        ← {t('products.backToProducts')}
      </Button>

      <Card className="product-detail-card">
        <div className="product-detail-grid">
          <div className="product-images">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="main-image"
            />
            {product.images.length > 1 && (
              <div className="image-gallery">
                {product.images.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="gallery-image"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-brand">{product.brand}</p>
            <p className="detail-price">${product.price.toFixed(2)}</p>
            
            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">{t('products.rating')}</span>
                <span className="meta-value">⭐ {product.rating.toFixed(1)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t('products.stock')}</span>
                <span className="meta-value">{product.stock}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t('products.category')}</span>
                <span className="meta-value">{product.category}</span>
              </div>
            </div>

            {product.discountPercentage > 0 && (
              <div className="discount-badge">
                -{product.discountPercentage.toFixed(0)}% OFF
              </div>
            )}

            <div className="detail-section">
              <h3>{t('products.description')}</h3>
              <p className="detail-description">{product.description}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
