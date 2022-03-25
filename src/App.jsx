import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Container from './components/Container'
import Checkbox from './components/Checkbox'
import Panel from './components/Panel'
import View from './components/View'
import Layout from './components/Layout'
import Button from './components/Button'

import { ReactComponent as Dropbox } from './assets/icons/dropbox.svg'
import { ReactComponent as Floppy } from './assets/icons/floppy.svg'
import { ReactComponent as Codesandbox } from './assets/icons/codesandbox.svg'
import { ReactComponent as Heart } from './assets/icons/heart.svg'

const StyledCategories = styled.div`
  grid-area: categories;
`

const StyledHeader = styled.div`
  grid-area: header;
  padding: 10px;
`

const PRODUCTS = []

const CATEGORIES = [
  {
    id: 1,
    name: 'Category 1',
    productsIds: []
  }
]

function App() {
  const [products, setProducts] = useState(PRODUCTS)
  const [checkedAvaliableProductIds, setCheckedAvaliableProductIds] = useState(
    []
  )
  const [checkedCategoryProductIds, setCheckedCategoryProductIds] = useState([])
  const [categories, setCategories] = useState(CATEGORIES)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/data/products.json')
      setProducts(response.data)
    }
    fetchData()
  }, [])

  const addProductfromCategory = (categoryId) => () => {
    setProducts((currrentProducts) =>
      currrentProducts.map((product) => {
        if (checkedAvaliableProductIds.includes(String(product.id))) {
          return {
            ...product,
            categoryId
          }
        }
        return product
      })
    )

    setCategories((currentCategories) =>
      currentCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            productsIds: [
              ...category.productsIds,
              ...checkedAvaliableProductIds
            ]
          }
        }

        return category
      })
    )

    setCheckedAvaliableProductIds([])
  }

  const handleOnChange = (event) => {
    setCheckedAvaliableProductIds((currentIds) => {
      if (currentIds.includes(event.target.value)) {
        return currentIds.filter(
          (currentId) => currentId !== event.target.value
        )
      }

      return [...currentIds, event.target.value]
    })
  }

  const handleOnChangeCategory = (event) => {
    setCheckedCategoryProductIds((currentIds) => {
      if (currentIds.includes(event.target.value)) {
        return currentIds.filter(
          (currentId) => currentId !== event.target.value
        )
      }

      return [...currentIds, event.target.value]
    })
  }

  const deleteProductFromCategory = (categoryId) => () => {
    setProducts((currrentProducts) =>
      currrentProducts.map((product) => {
        if (
          checkedCategoryProductIds.includes(String(product.id)) &&
          product.categoryId === categoryId
        ) {
          return {
            ...product,
            categoryId: null
          }
        }

        return product
      })
    )

    setCategories((currentCategories) =>
      currentCategories.map((category) => {
        if (category.id === categoryId) {
          setCheckedCategoryProductIds((currentCheckedProductIds) =>
            currentCheckedProductIds.filter(
              (productId) => !category.productsIds.includes(productId)
            )
          )

          return {
            ...category,
            productsIds: category.productsIds.filter(
              (productId) =>
                !checkedCategoryProductIds.includes(String(productId))
            )
          }
        }

        return category
      })
    )
  }

  const addCategory = () => {
    setCategories((currentCategories) => [
      ...currentCategories,
      {
        id: currentCategories.length + 1,
        name: `Category ${currentCategories.length + 1}`,
        productsIds: []
      }
    ])
  }

  const removeCategory = (categoryId) => () => {
    setCategories((currentCategories) =>
      currentCategories.filter(
        (category) => String(categoryId) !== String(category.id)
      )
    )
  }

  const avaliableProducts = products.filter((product) => !product.categoryId)

  const getProducts = (productIds) =>
    products.filter((product) => productIds.includes(String(product.id)))

  const categoryButtonDisabled = (productIds) =>
    !checkedCategoryProductIds.some((checkedCategoryProductId) =>
      productIds.includes(checkedCategoryProductId)
    )

  return (
    <Container>
      <Layout>
        <StyledHeader>
          <h1>Initial Screen</h1>
        </StyledHeader>

        <Panel gridArea="products">
          <Panel.Header>
            <Dropbox />
            <h4>Available Product</h4>
          </Panel.Header>
          <Panel.Body>
            {avaliableProducts.map(({ id, name }) => (
              <Checkbox
                mt="10px"
                key={id}
                id={`product-${id}`}
                value={id}
                onChange={handleOnChange}
              >
                {name}
              </Checkbox>
            ))}
          </Panel.Body>
        </Panel>

        <StyledCategories>
          {categories.map((category) => {
            return (
              <Panel mb="15px" key={category.id}>
                <Panel.Header>
                  <Codesandbox />
                  {category.name}
                </Panel.Header>
                {getProducts(category.productsIds).length > 0 ? (
                  <Panel.Body>
                    {getProducts(category.productsIds).map((product) => (
                      <Checkbox
                        mt="10px"
                        key={product.id}
                        id={`category-${product.id}`}
                        value={product.id}
                        onChange={handleOnChangeCategory}
                      >
                        {product.name}
                      </Checkbox>
                    ))}
                  </Panel.Body>
                ) : (
                  <Panel.EmptyState>
                    <Heart />
                    <p>Select product to add here</p>
                  </Panel.EmptyState>
                )}

                <Panel.Footer>
                  {checkedAvaliableProductIds.length === 0 ? (
                    <Button disabled>Add product(s)</Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={addProductfromCategory(category.id)}
                    >
                      Add {checkedAvaliableProductIds.length} product(s)
                    </Button>
                  )}

                  {checkedCategoryProductIds.length === 0 ? (
                    <Button
                      disabled
                      onClick={deleteProductFromCategory(category.id)}
                    >
                      Remove products(s)
                    </Button>
                  ) : (
                    <Button
                      variant={
                        !categoryButtonDisabled(category.productsIds) &&
                        'primary'
                      }
                      onClick={deleteProductFromCategory(category.id)}
                    >
                      Remove
                      {
                        checkedCategoryProductIds.filter((productId) =>
                          category.productsIds.includes(productId)
                        ).length
                      }
                      product(s)
                    </Button>
                  )}
                  {categories.length === 1 ? (
                    <Button ml="auto" disabled>
                      Remove Category
                    </Button>
                  ) : (
                    <Button
                      ml="auto"
                      variant="primary"
                      onClick={removeCategory(category.id)}
                    >
                      Remove Category
                    </Button>
                  )}
                </Panel.Footer>
              </Panel>
            )
          })}
          <Button
            variant="primary"
            width="100%"
            padding="10px 0"
            onClick={addCategory}
          >
            Add Category
          </Button>
        </StyledCategories>

        <Panel gridArea="review" variant="primary">
          <Panel.Header color="#2B4EE8">
            <Floppy /> <h4>Review</h4>
          </Panel.Header>
          <Panel.Body>
            <View>Available Products: {avaliableProducts.length}</View>
            <View>Categories: {categories.length}</View>
            <View mt="20px">
              {categories.map((category) => (
                <View key={category.id}>
                  {category.name}:{category.productsIds.length} product(s)
                </View>
              ))}
            </View>
          </Panel.Body>
        </Panel>
      </Layout>
    </Container>
  )
}

export default App
