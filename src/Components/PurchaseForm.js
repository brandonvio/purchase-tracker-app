import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import * as yup from "yup";
import { Formik } from "formik";
// import Select from "react-select";

export const PurchaseForm = ({ savePurchase, purchase, categories }) => {
  if (purchase.purchaseId === undefined) {
    reset();
  }

  function reset() {
    purchase.payeeName = "";
    purchase.purchaseAmount = "";
    purchase.purchaseDate = "";
    purchase.memo = "";
    purchase.categoryId = "";
  }

  const submitForm = async data => {
    // console.log(data);
    const formData = { ...data };
    reset();
    formData.purchaseDate = new Date(formData.purchaseDate).toISOString();
    formData.purchaseAmount = parseFloat(formData.purchaseAmount);
    formData.categoryId = parseInt(formData.categoryId);

    await savePurchase(formData);
  };

  const schema = yup.object({
    payeeName: yup.string().required("Payee is required!"),
    purchaseAmount: yup
      .number("Purchase Amount must be a number!")
      .positive("Purchase Amount must be positive!")
      .required("Purchase Amount is required!"),
    purchaseDate: yup
      .date("Purchase Date must be a valid date!")
      .required("Purchase Date is required!"),
    memo: yup.string().required("Memo is required!"),
    categoryId: yup.string().required("Category is required!")
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      enableReinitialize={true}
      initialValues={{
        ...purchase
      }}
    >
      {({
        touched,
        errors,
        handleSubmit,
        setFieldTouched,
        setFieldValue,
        handleChange,
        handleBlur,
        values
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="payeeName">Payee</Label>

                  <Input
                    type="text"
                    name="payeeName"
                    id="payeeName"
                    value={values.payeeName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.payeeName && touched.payeeName}
                  />
                  <FormFeedback tooltip>{errors.payeeName}</FormFeedback>
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="purchaseAmount">Purchase Amount</Label>
                  <Input
                    type="text"
                    name="purchaseAmount"
                    id="purchaseAmount"
                    value={values.purchaseAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.purchaseAmount && touched.purchaseAmount}
                  />
                  <FormFeedback tooltip>{errors.purchaseAmount}</FormFeedback>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="purchaseDate">Date of Purchase</Label>
                  <Input
                    type="text"
                    name="purchaseDate"
                    id="purchaseDate"
                    value={values.purchaseDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.purchaseDate && touched.purchaseDate}
                  />
                  <FormFeedback tooltip>{errors.purchaseDate}</FormFeedback>
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    value={values.categoryId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ display: "block" }}
                  >
                    <option value="">Select a Category...</option>
                    {categories.map(item => {
                      return (
                        <option key={item.categoryId} value={item.categoryId}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </Input>
                  <FormFeedback tooltip>{errors.categoryId}</FormFeedback>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="memo">Memo</Label>
            <Input
              type="text"
              name="memo"
              id="memo"
              value={values.memo}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={errors.memo && touched.memo}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};
