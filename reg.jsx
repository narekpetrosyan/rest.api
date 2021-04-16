register.jsx


import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Button,
    InputGroup,
} from "reactstrap";
import {
    Password,
    SignIn,
    EmailAddress,
    CreateAccount,
    YourName,
    PrivacyPolicy,
    PhoneNumber,
    LastName,
} from "../../constant";
import loginIcon from "../../assets/images/logo/login.png";
import leftImg from "../../assets/images/login/img3.jpg";
import leftImg1 from "../../assets/images/login/img3.jpg";
import { setLoadingAction } from "../../redux/authentication/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const styles = {
    inputGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    inputGroup__list: {
        position: "absolute",
        width: "50px",
        backgroundColor: "whitesmoke",
        marginTop: 35,
        zIndex: 9999,
        borderRadius: "0px 0px 4px 4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inputGroup__button: {
        cursor: "pointer",
        borderRadius: "4px 0px 0px 4px",
        width: "60px",
        backgroundColor: "#f3f3ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inputGroup__button_img: {
        height: "18px",
        width: "30px",
    },
    inputGroup__list_ul: {
        padding: 0,
        margin: "0 auto",
    },
    inputGroup__list_ul_li: {
        marginTop: 5,
        padding: "2px 3px",
    },
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(50, "Указанное имя слишком длинное.")
        .required("Укажите имя."),
    lastName: Yup.string()
        .max(50, "Указанное фамилия слишком длинное.")
        .required("Укажите фамилию."),
    email: Yup.string()
        .email("Укажите корректный адрес эл. почты.")
        .required("Укажите адрес эл. почты."),
    phone: Yup.string()
        .matches(
            /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm,
            "Укажите правильный номер телефона."
        )
        .required("Укажите номер телефона."),
    password: Yup.string()
        .required("Укажите пароль.")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
            "Пароль должен содержать буквы разных регистров и цифру."
        ),
});

const FlagItem = ({ src, name, val, changeFlag }) => {
    return (
        <li style={styles.inputGroup__list_ul_li}>
            <img
                style={styles.inputGroup__button_img}
                src={src}
                alt={name}
                onClick={() => changeFlag(val, src)}
            />
        </li>
    );
};

const RegisterWithBgImage = (props) => {
    const history = useHistory();

    const dispatch = useDispatch();
    const err_msg = useSelector((state) => state.User.errors);
    const lding = useSelector((state) => state.User.loading);

    const [togglePassword, setTogglePassword] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [phoneVal, setPhoneVal] = useState("+7");
    const [flagVal, setFlagVal] = useState(
        "https://cdn3.iconfinder.com/data/icons/world-flags-square-vol-3/48/Russia-512.png"
    );
    const [flags, setFlags] = useState([
        {
            name: "rus",
            src:
                "https://cdn3.iconfinder.com/data/icons/world-flags-square-vol-3/48/Russia-512.png",
            val: "+7",
        },
        {
            name: "us",
            src:
                "https://www.freeiconspng.com/thumbs/american-us-flag-icon/us-flag-icon-10.gif",
            val: "+91",
        },
    ]);

    const changeFlag = (vv, ss) => {
        setPhoneVal(vv);
        setFlagVal(ss);
        setOpen(false);
    };

    const toggle = () => {
        setOpen(!isOpen);
    };
    const HideShowPassword = (tPassword) => {
        setTogglePassword(!tPassword);
    };
    const handleSubmit = (values) => {
        // dispatch(registerUserAction(values));
        dispatch(setLoadingAction(true));
        setTimeout(() => {
            console.log("registered", values);
            dispatch(setLoadingAction(false));
        }, 2000);
    };

    return (
        <Container fluid={true} className="p-0">
            <Row>
                <Col xl="5" className="p-0">
                    <div className="login-card">
                        <div>
                            <div>
                                <Link className="logo" to="/">
                                    <img
                                        className="img-fluid for-light"
                                        src={loginIcon}
                                        alt="looginpage"
                                    />
                                </Link>
                            </div>
                            <div className="login-main">
                                <Formik
                                    initialValues={{
                                        firstName: "",
                                        lastName: "",
                                        email: "",
                                        password: "",
                                        phone: "",
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values);
                                        resetForm({});
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form className="theme-form">
                                            <h4>{"Создать аккаут."}</h4>
                                            <p>
                                                {
                                                    "Укажите Ваши данные для создания аккаунта."
                                                }
                                            </p>
                                            {err_msg && (
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                >
                                                    {err_msg}
                                                </div>
                                            )}
                                            <FormGroup>
                                                <div className="form-row">
                                                    <Col xs="6">
                                                        <Label className="col-form-label pt-0">
                                                            {YourName}
                                                        </Label>
                                                        <Field
                                                            className={`form-control ${
                                                                errors.firstName &&
                                                                touched.firstName
                                                                    ? "is-invalid"
                                                                    : ""
                                                            }`}
                                                            type="text"
                                                            required=""
                                                            placeholder="Имя"
                                                            name="firstName"
                                                        />
                                                        {errors.firstName &&
                                                        touched.firstName ? (
                                                            <div className="text-danger">
                                                                {
                                                                    errors.firstName
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </Col>
                                                    <Col xs="6">
                                                        <Label className="col-form-label pt-0">
                                                            {LastName}
                                                        </Label>
                                                        <Field
                                                            type="text"
                                                            required=""
                                                            placeholder="Фамилия"
                                                            name="lastName"
                                                            className={`form-control ${
                                                                errors.lastName &&
                                                                touched.lastName
                                                                    ? "is-invalid"
                                                                    : ""
                                                            }`}
                                                        />
                                                        {errors.lastName &&
                                                        touched.lastName ? (
                                                            <div className="text-danger">
                                                                {
                                                                    errors.lastName
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </Col>
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    {EmailAddress}
                                                </Label>
                                                <Field
                                                    className={`form-control ${
                                                        errors.email &&
                                                        touched.email
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="email"
                                                    required=""
                                                    placeholder="example@domain.ru"
                                                    name="email"
                                                />
                                                {errors.email &&
                                                touched.email ? (
                                                    <div className="text-danger">
                                                        {errors.email}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    {PhoneNumber}
                                                </Label>
                                                <InputGroup>
                                                    <div
                                                        style={
                                                            styles.inputGroup__button
                                                        }
                                                    >
                                                        {
                                                            <img
                                                                src={flagVal}
                                                                alt="Russia Flag"
                                                                style={
                                                                    styles.inputGroup__button_img
                                                                }
                                                                onClick={toggle}
                                                            />
                                                        }
                                                    </div>
                                                    {isOpen && (
                                                        <div
                                                            style={
                                                                styles.inputGroup__list
                                                            }
                                                        >
                                                            <ul
                                                                style={
                                                                    styles.inputGroup__list_ul
                                                                }
                                                            >
                                                                {flags.map(
                                                                    (
                                                                        fl,
                                                                        index
                                                                    ) => (
                                                                        <FlagItem
                                                                            {...fl}
                                                                            key={
                                                                                index
                                                                            }
                                                                            changeFlag={
                                                                                changeFlag
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        required=""
                                                        placeholder={`${phoneVal} (000) 000-00-00`}
                                                        name="phone"
                                                        className={`form-control ${
                                                            errors.phone &&
                                                            touched.phone
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                    />
                                                </InputGroup>
                                                {errors.phone &&
                                                touched.phone ? (
                                                    <div className="text-danger">
                                                        {errors.phone}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="col-form-label">
                                                    {Password}
                                                </Label>
                                                <Field
                                                    className={`form-control ${
                                                        errors.password &&
                                                        touched.password
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type={
                                                        togglePassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    name="password"
                                                    required=""
                                                    placeholder="*********"
                                                />
                                                {errors.password &&
                                                touched.password ? (
                                                    <div className="text-danger">
                                                        {errors.password}
                                                    </div>
                                                ) : null}
                                                <div
                                                    className="show-hide"
                                                    style={{
                                                        marginRight: 7,
                                                    }}
                                                    onClick={() =>
                                                        HideShowPassword(
                                                            togglePassword
                                                        )
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            togglePassword
                                                                ? ""
                                                                : "show"
                                                        }
                                                    ></span>
                                                </div>
                                            </FormGroup>
                                            <div className="form-group mb-0">
                                                <div className="checkbox ml-3">
                                                    <Field
                                                        id="checkbox1"
                                                        type="checkbox"
                                                    />
                                                    <Label
                                                        className="text-muted"
                                                        for="checkbox1"
                                                    >
                                                        {"Согласиться с"}
                                                        <a
                                                            className="ml-2"
                                                            href="#javascript"
                                                        >
                                                            {PrivacyPolicy}
                                                        </a>
                                                    </Label>
                                                </div>
                                                <Button
                                                    color="primary"
                                                    className="btn-block"
                                                    type="submit"
                                                    disabled={lding}
                                                >
                                                    {CreateAccount}
                                                </Button>
                                            </div>
                                            <p className="mt-4 mb-0">
                                                {"Уже есть аккаунт?"}
                                                <Link
                                                    className="ml-2"
                                                    to="/login"
                                                >
                                                    {SignIn}
                                                </Link>
                                            </p>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col
                    xl="7"
                    style={{
                        backgroundImage: `url(${leftImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "block",
                    }}
                >
                    <img
                        className="bg-img-cover bg-center"
                        src={leftImg1}
                        alt="looginpage"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterWithBgImage;

