create database if not exists jen_commerce;

use jen_commerce;

create table if not exists categories
(
    id           int auto_increment
        primary key,
    categoryName varchar(100) not null,
    description  varchar(300) null
);

create table if not exists delivery_address
(
    id            int auto_increment
        primary key,
    userID        int          not null,
    streetName    varchar(250) not null,
    streetNo      varchar(250) not null,
    district      varchar(250) not null,
    region        varchar(250) not null,
    ghanaPostCode varchar(200) null
);

create table if not exists order_customer
(
    id        int auto_increment
        primary key,
    orderID   int          not null,
    userID    int          not null,
    createdOn varchar(250) not null
);

create table if not exists order_product
(
    id         int auto_increment
        primary key,
    productID  int          not null,
    quantity   int          not null,
    totalPrice double       not null,
    createdOn  varchar(250) not null
);

create table if not exists products
(
    id             int auto_increment
        primary key,
    productName    varchar(100) not null,
    categoryID     int          not null,
    price          double       not null,
    productImage   varchar(300) null,
    description    varchar(300) null,
    stock          int          not null,
    colour         varchar(200) null,
    categoryGender int          null,
    createdOn      varchar(300) not null
);

create table if not exists promotions
(
    id            int auto_increment
        primary key,
    promotionName varchar(250)                  not null,
    categoryID    int                           not null,
    discount      int                           not null,
    startDate     varchar(250)                  not null,
    endDate       varchar(250)                  not null,
    status        varchar(100) default 'active' null,
    createdOn     varchar(250)                  not null
);

create table if not exists users
(
    id         int auto_increment
        primary key,
    firstName  varchar(100) default '' not null,
    lastName   varchar(100) default '' not null,
    otherNames varchar(100) default '' null,
    email      varchar(250) default '' not null,
    userName   varchar(250)            null,
    password   varchar(250) default '' not null,
    contactNo  varchar(20)  default '' not null,
    userType   int          default 1  null
);