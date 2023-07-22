CREATE TABLE obs_db.category(
`idCategory` INT(10) NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(255) NOT NULL, PRIMARY KEY(`idCategory`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

INSERT INTO `category` (`idCategory`, `categoryName`) VALUES
(1, 'mon chinh');

CREATE TABLE obs_db.customer(
  `idCustomer` INT(10) NOT NULL AUTO_INCREMENT,
  `customerName` VARCHAR(111),
  `phoneNumber` INT(11),
  birthday DATE,
  sex VARCHAR(3),
  address VARCHAR(255),
  email VARCHAR(255),
  `isDelete` TINYINT(1) DEFAULT 0,
  PRIMARY KEY(`idCustomer`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

INSERT INTO `customer` (`idCustomer`, `customerName`, `phoneNumber`, `birthday`, `sex`, `address`, `email`, `isDelete`) VALUES
(1, 'Nguyễn Bảnh', 987654321, '1987-03-20', 'Nữ', '234 An Dương Vương Quận 7', '24th@gmail.com', 0);

CREATE TABLE obs_db.discount(
  `idDiscount` INT(10) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(255) NOT NULL,
  `discountName` VARCHAR(255),
  `description` VARCHAR(255),
  `value` INT(11) NOT NULL,
  `discountType` ENUM('fixed amount','percentage') NOT NULL,
  `typeApply` ENUM('all','specific') NOT NULL,
  `startDate` DATE,
  `endDate` DATE,
  PRIMARY KEY(`idDiscount`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

INSERT INTO `discount` (`idDiscount`, `code`, `discountName`, `description`, `value`, `discountType`, `typeApply`, `startDate`, `endDate`) VALUES
(1, 'A1234', 'giam 10k', 'duoc giam 10k', 10000, 'fixed amount', 'all', '2023-07-20', '2023-07-25'),
(2, 'S2345', 'giam 20k', 'duoc giam 20k', 20000, 'fixed amount', 'specific', '2023-07-21', '2023-07-23');


CREATE TABLE obs_db.ingredient(
  `idIngredient` INT(10) NOT NULL AUTO_INCREMENT,
  `ingredientName` VARCHAR(255),
  `remainQuantity` DOUBLE(10,2) NOT NULL,
  unit ENUM('KG','G') NOT NULL,
  `idReceipt` INT(10) NOT NULL,
  PRIMARY KEY(`idIngredient`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `phieuNhap_nguyenLieu` USING BTREE ON obs_db.ingredient
    (`idReceipt`);
  
INSERT INTO `ingredient` (`idIngredient`, `ingredientName`, `remainQuantity`, `unit`, `idReceipt`) VALUES
(1, 'thit ga', 5.00, 'KG', 1),
(2, 'thit heo', 5.00, 'KG', 1),
(3, 'rau', 2.00, 'KG', 1);

CREATE TABLE obs_db.invoice(
  `idInvoice` INT(10) NOT NULL AUTO_INCREMENT,
  `amountDiscount` DOUBLE(3,2),
  total DOUBLE(11,2),
  payment DOUBLE(11,2),
  `idStaff` INT(10) NOT NULL,
  `idOrder` INT(10) NOT NULL,
  `idDiscount` INT(10) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  note VARCHAR(100),
  PRIMARY KEY(`idInvoice`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX hoadonbanhang_ibfk_1 USING BTREE ON obs_db.invoice(`idStaff`);
  
  CREATE INDEX `donHang_hoadonbanhang` USING BTREE ON obs_db.invoice(`idOrder`);
  
  CREATE INDEX `giamGia_hoadonbanhang` USING BTREE ON obs_db.invoice(`idDiscount`)
    ;
  
INSERT INTO `invoice` (`idInvoice`, `amountDiscount`, `total`, `payment`, `idStaff`, `idOrder`, `idDiscount`, `createdAt`, `note`) VALUES
(1, 9.99, 200000.00, 190000.00, 1, 1, 1, '2023-07-15 22:27:50', 'ghi chu abc');

CREATE TABLE obs_db.invoicedetail(
  `idInvoiceDetail` INT(10) NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(255),
  quantity INT(10),
  price DOUBLE(10,2),
  `idProduct` INT(10) NOT NULL,
  `idInvoice` INT(10) NOT NULL,
  PRIMARY KEY(`idInvoiceDetail`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX `maHoaDonBan` USING BTREE ON obs_db.invoicedetail
    (`idInvoice`, `idProduct`);
  
  CREATE INDEX `maSanPham` USING BTREE ON obs_db.invoicedetail(`idProduct`);
  
  CREATE INDEX `maHoaDonBanHang` USING BTREE ON obs_db.invoicedetail(`idInvoice`);
  
INSERT INTO `invoicedetail` (`idInvoiceDetail`, `productName`, `quantity`, `price`, `idProduct`, `idInvoice`) VALUES
(1, 'ga heo mix rau xanh', 1, 200000.00, 1, 1);

CREATE TABLE obs_db.`order`(
  `idOrder` INT(10) NOT NULL AUTO_INCREMENT,
  `guestNumber` INT(10),
  deposit DOUBLE(11,2),
  `orderType` ENUM('preOrder','order') NOT NULL,
  `status` ENUM('cart','providing','success') NOT NULL,
  `idTable` INT(10),
  `idCustomer` INT(10),
  `idStaff` INT(10) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  note VARCHAR(100),
  PRIMARY KEY(`idOrder`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX `maBan` USING BTREE ON obs_db.`order`(`idTable`);
  
  CREATE INDEX khachhang_giohang USING BTREE ON obs_db.`order`(`idCustomer`);
  
INSERT INTO `order` (`idOrder`, `guestNumber`, `deposit`, `orderType`, `status`, `idTable`, `idCustomer`, `idStaff` `createdAt`, `note`) VALUES
(1, 4, NULL, 'order', 'cart', 1, 1, 1, '2023-07-15 22:27:49', 'abc');

CREATE TABLE obs_db.orderdetail(
  `idOrderDetail` INT(10) NOT NULL AUTO_INCREMENT,
  quantity INT(10),
  `status` ENUM('completed','pending','failed'),
  `idOrder` INT(10),
  `idProduct` INT(10) NOT NULL,
  `callTime` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  note VARCHAR(255),
  PRIMARY KEY(`idOrderDetail`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX `maSanPham` USING BTREE ON obs_db.orderdetail(`idOrder`);
  
  CREATE INDEX `maGioHang` USING BTREE ON obs_db.orderdetail(`idOrder`);
  
  CREATE INDEX `sanpham_chiTietDonHang_1` USING BTREE ON obs_db.orderdetail
    (`idProduct`);
  
INSERT INTO `orderdetail` (`idOrderDetail`, `quantity`, `status`, `idOrder`, `idProduct`, `callTime`, `note`) VALUES
(1, 1, 'completed', 1, 1, '2023-07-15 22:27:50', 'ghi chu abc');

CREATE TABLE obs_db.`position`(
  `idPosition` INT(10) NOT NULL AUTO_INCREMENT,
  `positionName` VARCHAR(8),
  `basicSalary` DOUBLE(10,2),
  PRIMARY KEY(`idPosition`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

INSERT INTO `position` (`idPosition`, `positionName`, `basicSalary`) VALUES
(1, 'nhan vie', 40000.00);

CREATE TABLE obs_db.product(
  `idProduct` INT(10) NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(255),
  image VARCHAR(255),
  `productType` ENUM('food','drink') NOT NULL,
  `isDirect` TINYINT(1) DEFAULT 1,
  `isDelete` TINYINT(1) DEFAULT 0,
  `idCategory` INT(10) NOT NULL,
  PRIMARY KEY(`idProduct`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX category_product USING BTREE ON obs_db.product(`idCategory`);
  
INSERT INTO `product` (`idProduct`, `productName`, `image`, `productType`, `isDirect`, `isDelete`, `idCategory`) VALUES
(1, 'ga heo mix rau xanh', '/media/imgs/gaHeoMixRauXanh', 'food', 1, 0, 1);

CREATE TABLE obs_db.productapplied(
`idDiscount` INT(10) NOT NULL, `idProduct` INT(10) NOT NULL,
  PRIMARY KEY(`idDiscount`, `idProduct`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `sanpham_sanPhamApDung` USING BTREE ON obs_db.productapplied
    (`idProduct`);
  
CREATE TABLE obs_db.productprice(
  `idProduct` INT(10) NOT NULL,
  `productName` VARCHAR(255),
  price DOUBLE(11,2) NOT NULL,
  cost DOUBLE(11,2) NOT NULL,
  PRIMARY KEY(`idProduct`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

INSERT INTO `productprice` (`idProduct`, `productName`, `price`, `cost`) VALUES
(1, 'ga heo mix rau xanh', 200000.00, 100000.00);

CREATE TABLE obs_db.receipt(
  `idReceipt` INT(10) NOT NULL AUTO_INCREMENT,
  `receiptType` ENUM('food','tools') NOT NULL,
  total DOUBLE(11,2),
  `idSupplier` INT(10) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  note VARCHAR(255),
  PRIMARY KEY(`idReceipt`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `nhacungcap_phieuNhap` USING BTREE ON obs_db.receipt(`idSupplier`);
  
INSERT INTO `receipt` (`idReceipt`, `receiptType`, `total`, `idSupplier`, `createdAt`, `note`) VALUES
(1, 'food', 1240000.00, 1, '2023-07-15 22:27:49', 'ton tien qua'),
(2, 'tools', 120000.00, 2, '2023-07-15 22:27:49', 'it ton tien');

CREATE TABLE obs_db.receiptdetail(
  `idReceiptDetail` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  quantity INT(11) NOT NULL,
  price DOUBLE(10,2) NOT NULL,
  unit ENUM('KG','G','UNIT') NOT NULL,
  `idReceipt` INT(10) NOT NULL,
  PRIMARY KEY(`idReceiptDetail`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `phieuNhap_chiTietPhieuNhap` USING BTREE ON obs_db.receiptdetail
    (`idReceipt`);
  
INSERT INTO `receiptdetail` (`idReceiptDetail`, `name`, `quantity`, `price`, `unit`, `idReceipt`) VALUES
(1, 'thit ga', 5, 100000.00, 'KG', 1),
(2, 'thit heo', 10, 50000.00, 'KG', 1),
(3, 'rau', 6, 40000.00, 'KG', 1),
(4, 'dao', 6, 20000.00, 'UNIT', 2);

CREATE TABLE obs_db.recipe(
  `idProduct` INT(10) NOT NULL,
  `idIngredient` INT(10) NOT NULL,
  quantity DOUBLE(10,2) NOT NULL,
  PRIMARY KEY(`idIngredient`, `idProduct`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `sanpham_congThuc` USING BTREE ON obs_db.recipe(`idProduct`);
  
INSERT INTO `recipe` (`idProduct`, `idIngredient`, `quantity`) VALUES
(1, 1, 1.00),
(1, 2, 2.50),
(1, 3, 2.00);

CREATE TABLE obs_db.staff(
  `idStaff` INT(10) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(25),
  `lastName` VARCHAR(25),
  `phoneNumber` BIGINT(11),
  birthday DATE,
  sex VARCHAR(3),
  address VARCHAR(255),
  email VARCHAR(255),
  `workingDate` DATE,
  `idPosition` INT(10) NOT NULL,
  `idAccount` INT(10),
  `isDelete` TINYINT(1) DEFAULT 0,
  PRIMARY KEY(`idStaff`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX `maChucVu` USING BTREE ON obs_db.staff(`idPosition`);
  
INSERT INTO `staff` (`idStaff`, `firstName`, `lastName`, `phoneNumber`, `birthday`, `sex`, `address`, `email`, `workingDate`, `idPosition`, `isDelete`) VALUES
(1, 'Tô Huỳnh Thiện', 'Hiếu', 908888329, '2000-01-01', 'Nam', '23 An Dương Vương 2', 'no1@gmail.com', '2023-01-30', 1, 0);

CREATE TABLE obs_db.supplier(
  `idSupplier` INT(10) NOT NULL AUTO_INCREMENT,
  `supplierName` VARCHAR(255),
  `phoneNumber` INT(11),
  address VARCHAR(255),
  email VARCHAR(255),
  `supplyGoods` VARCHAR(255),
  `isDelete` TINYINT(1) DEFAULT 0,
  PRIMARY KEY(`idSupplier`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

INSERT INTO `supplier` (`idSupplier`, `supplierName`, `phoneNumber`, `address`, `email`, `supplyGoods`, `isDelete`) VALUES
(1, 'Công ty ABC 1', 123456789, '234 Tôn Thất Tùng Phường 24 Quận 5', '123@gmailcom', 'Thuc pham', 0),
(2, 'Công ty ABC 2', 123456789, '235 Tôn Thất Tùng Phường 24 Quận 5', '223@gmailcom', 'Dụng cụ', 0);

CREATE TABLE obs_db.`table`(
  `idTable` INT(10) NOT NULL AUTO_INCREMENT,
  `tableName` VARCHAR(25),
  `tableType` ENUM("classic", "vip") NOT NULL,
  `isUsing` TINYINT(1) NOT NULL DEFAULT 0,
  `isDelete` TINYINT(1) DEFAULT 0,
  PRIMARY KEY(`idTable`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

INSERT INTO `table` (`idTable`, `tableName`, `tableType`, `isUsing`, `isDelete`) VALUES
(1, 'Ban 1', 'classic', 1, 0),
(2, 'Ban 2', 'classic', 1, 0),
(3, 'Ban 3', 'vip', 0, 1);

CREATE TABLE obs_db.warehouse(
  `idWareHouse` INT(11) NOT NULL AUTO_INCREMENT,
  `wareHouseName` VARCHAR(255),
  `remainQuantity` INT(11) NOT NULL,
  unit ENUM('UNIT') NOT NULL,
  `idReceipt` INT(10) NOT NULL,
  PRIMARY KEY(`idWareHouse`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `phieuNhap_kho` USING BTREE ON obs_db.warehouse(`idReceipt`);
  
INSERT INTO `warehouse` (`idWareHouse`, `wareHouseName`, `remainQuantity`, `unit`, `idReceipt`) VALUES
(1, 'dao', 6, 'UNIT', 2);

CREATE TABLE obs_db.`account`(
  `idAccount` INT(10) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `accessKey` VARCHAR(255),
  `refreshKey` VARCHAR(255),
  `isLock` TINYINT(1) DEFAULT 0,
  PRIMARY KEY(`idAccount`)
) DEFAULT CHARACTER SET = `utf8` COLLATE = `utf8_general_ci`;

CREATE TABLE obs_db.permission(
`idPermission` INT(10) NOT NULL AUTO_INCREMENT,
  `permissionName` VARCHAR(255) NOT NULL, PRIMARY KEY(`idPermission`)
) DEFAULT CHARACTER SET = `utf8` COLLATE = `utf8_general_ci`;

insert into permission (permissionName) values ('kiem toan'), ('order'), ('manager');

CREATE TABLE obs_db.account_permission(
  `idAP` INT NOT NULL AUTO_INCREMENT,
  `idPermission` INT(10) NOT NULL,
  `idAccount` INT(10) NOT NULL,
  PRIMARY KEY(`idAP`)
) DEFAULT CHARACTER SET = `utf8` COLLATE = `utf8_general_ci`;

CREATE TABLE obs_db.logger(
  `idLog` INT(10) NOT NULL,
  `createdAt` DATE NOT NULL DEFAULT current_timestamp(),
  `action` VARCHAR(255) NOT NULL,
  `idAccount` INT(10) NOT NULL,
  PRIMARY KEY(`idLog`)
) DEFAULT CHARACTER SET = `utf8` COLLATE = `utf8_general_ci`;

ALTER TABLE obs_db.product
  ADD CONSTRAINT category_product
    FOREIGN KEY (`idCategory`) REFERENCES obs_db.category (`idCategory`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.orderdetail
  ADD CONSTRAINT chitietgiohang_ibfk_1
    FOREIGN KEY (`idOrder`) REFERENCES obs_db.`order` (`idOrder`) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE obs_db.invoicedetail
  ADD CONSTRAINT chitiethoadonsanpham_ibfk_1
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`)
      ON DELETE Cascade ON UPDATE Cascade;

ALTER TABLE obs_db.invoicedetail
  ADD CONSTRAINT chitiethoadonsanpham_ibfk_2
    FOREIGN KEY (`idInvoice`) REFERENCES obs_db.invoice (`idInvoice`)
      ON DELETE Cascade ON UPDATE Cascade;

ALTER TABLE obs_db.invoice
  ADD CONSTRAINT `donHang_hoadonbanhang`
    FOREIGN KEY (`idOrder`) REFERENCES obs_db.`order` (`idOrder`) ON DELETE Restrict
      ON UPDATE Restrict;

ALTER TABLE obs_db.invoice
  ADD CONSTRAINT `giamGia_hoadonbanhang`
    FOREIGN KEY (`idDiscount`) REFERENCES obs_db.discount (`idDiscount`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.productapplied
  ADD CONSTRAINT `giamGia_sanPhamApDung`
    FOREIGN KEY (`idDiscount`) REFERENCES obs_db.discount (`idDiscount`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.`order`
  ADD CONSTRAINT giohang_ibfk_1
    FOREIGN KEY (`idTable`) REFERENCES obs_db.`table` (`idTable`) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE obs_db.invoice
  ADD CONSTRAINT hoadonbanhang_ibfk_1
    FOREIGN KEY (`idStaff`) REFERENCES obs_db.staff (`idStaff`) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE obs_db.`order`
  ADD CONSTRAINT khachhang_giohang
    FOREIGN KEY (`idCustomer`) REFERENCES obs_db.customer (`idCustomer`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.recipe
  ADD CONSTRAINT `nguyenLieu_congThuc`
    FOREIGN KEY (`idIngredient`) REFERENCES obs_db.ingredient (`idIngredient`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.receipt
  ADD CONSTRAINT `nhacungcap_phieuNhap`
    FOREIGN KEY (`idSupplier`) REFERENCES obs_db.supplier (`idSupplier`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.staff
  ADD CONSTRAINT nhanvien_ibfk_1
    FOREIGN KEY (`idPosition`) REFERENCES obs_db.`position` (`idPosition`)
      ON DELETE Cascade ON UPDATE Cascade;

ALTER TABLE obs_db.receiptdetail
  ADD CONSTRAINT `phieuNhap_chiTietPhieuNhap`
    FOREIGN KEY (`idReceipt`) REFERENCES obs_db.receipt (`idReceipt`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.warehouse
  ADD CONSTRAINT `phieuNhap_kho`
    FOREIGN KEY (`idReceipt`) REFERENCES obs_db.receipt (`idReceipt`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.ingredient
  ADD CONSTRAINT `phieuNhap_nguyenLieu`
    FOREIGN KEY (`idReceipt`) REFERENCES obs_db.receipt (`idReceipt`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.orderdetail
  ADD CONSTRAINT `sanpham_chiTietDonHang_1`
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.recipe
  ADD CONSTRAINT `sanpham_congThuc`
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.productprice
  ADD CONSTRAINT `sanpham_giaSanPham`
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.productapplied
  ADD CONSTRAINT `sanpham_sanPhamApDung`
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`)
      ON DELETE Restrict ON UPDATE Restrict;

ALTER TABLE obs_db.`order`
  ADD CONSTRAINT staff_order
    FOREIGN KEY (`idStaff`) REFERENCES obs_db.staff (`idStaff`);

ALTER TABLE obs_db.staff
  ADD CONSTRAINT account_staff
    FOREIGN KEY (`idAccount`) REFERENCES obs_db.`account` (`idAccount`);

ALTER TABLE obs_db.account_permission
  ADD CONSTRAINT permission_account_permission
    FOREIGN KEY (`idPermission`) REFERENCES obs_db.permission (`idPermission`);

ALTER TABLE obs_db.account_permission
  ADD CONSTRAINT account_account_permission
    FOREIGN KEY (`idAccount`) REFERENCES obs_db.`account` (`idAccount`);

ALTER TABLE obs_db.logger
  ADD CONSTRAINT account_logger
    FOREIGN KEY (`idAccount`) REFERENCES obs_db.`account` (`idAccount`);
