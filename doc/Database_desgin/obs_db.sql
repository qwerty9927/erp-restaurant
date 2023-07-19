CREATE TABLE obs_db.supplier(
  `idSupplier` INT(10) NOT NULL AUTO_INCREMENT,
  `supplierName` VARCHAR(255),
  `phoneNumber` INT(11),
  address VARCHAR(255),
  email VARCHAR(255),
  `supplyGoods` VARCHAR(255),
  `isDelete` TINYINT(1),
  PRIMARY KEY(`idSupplier`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

insert into supplier(supplierName, phoneNumber, address, email, isDelete, supplyGoods) values ('Công ty ABC 1', 123456789, '234 Tôn Thất Tùng Phường 24 Quận 5', '123@gmailcom', 0, 'Thuc pham'); 
insert into supplier(supplierName, phoneNumber, address, email, isDelete, supplyGoods) values ('Công ty ABC 2', 123456789, '235 Tôn Thất Tùng Phường 24 Quận 5', '223@gmailcom', 0, 'Dụng cụ');

CREATE TABLE obs_db.receipt(
  `idReceipt` INT(10) NOT NULL AUTO_INCREMENT,
  `receiptType` ENUM('food', 'tools') NOT NULL,
  total DOUBLE(11,2),
  `idSupplier` INT(10) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  note VARCHAR(255),
  PRIMARY KEY(`idReceipt`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

insert into receipt(note, receiptType, total, idSupplier) values ('ton tien qua', 'food', 1240000, 1);
insert into receipt(note, receiptType, total, idSupplier) values ('it ton tien', 'tools', 120000, 2);

CREATE TABLE obs_db.`receiptDetail`(
  `idReceiptDetail` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DOUBLE(10,2) NOT NULL,
  unit ENUM('KG', 'G', 'UNIT') NOT NULL,
  `idReceipt` INT(10) NOT NULL,
  PRIMARY KEY(`idReceiptDetail`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

insert into receiptDetail(name, quantity, unit, price, idReceipt) values ('thit ga', 5, 'KG', 100000, 1);
insert into receiptDetail(name, quantity, unit, price, idReceipt) values ('thit heo', 10, 'KG', 50000, 1);
insert into receiptDetail(name, quantity, unit, price, idReceipt) values ('rau', 6, 'KG', 40000, 1);
insert into receiptDetail(name, quantity, unit, price, idReceipt) values ('dao', 6, 'UNIT', 20000, 2);

CREATE TABLE obs_db.ingredient(
  `idIngredient` INT(10) NOT NULL AUTO_INCREMENT,
  `ingredientName` VARCHAR(255),
  `remainQuantity` DOUBLE(10,2) NOT NULL,
  unit ENUM('KG', 'G') NOT NULL,
  `idReceipt` INT(10) NOT NULL,
  PRIMARY KEY(`idIngredient`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

insert into ingredient(ingredientName, remainQuantity, unit, idReceipt) values ('thit ga', 5, 'KG', 1);
insert into ingredient(ingredientName, remainQuantity, unit, idReceipt) values ('thit heo', 5, 'KG', 1);
insert into ingredient(ingredientName, remainQuantity, unit, idReceipt) values ('rau', 2, 'KG', 1);

CREATE TABLE obs_db.warehouse(
  `idWareHouse` INT NOT NULL AUTO_INCREMENT,
  `wareHouseName` VARCHAR(255),
  `remainQuantity` INT NOT NULL,
  unit ENUM('UNIT') NOT NULL,
  `idReceipt` INT(10) NOT NULL,
  PRIMARY KEY(`idWareHouse`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

insert into warehouse(wareHouseName, remainQuantity, unit, idReceipt) values ('dao', 6, 'UNIT', 2);

CREATE TABLE obs_db.recipe(
  `idProduct` INT(10) NOT NULL,
  `idIngredient` INT(10) NOT NULL,
  quantity DOUBLE(10,2) NOT NULL,
  PRIMARY KEY(`idIngredient`, `idProduct`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

insert into recipe(idProduct, quantity, idIngredient) values (1, 1, 1);
insert into recipe(idProduct, quantity, idIngredient) values (1, 2.5, 2);
insert into recipe(idProduct, quantity, idIngredient) values (1, 2, 3);


CREATE TABLE obs_db.product(
  `idProduct` INT(10) NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(255),
  image VARCHAR(255),
  `productType` ENUM('food', 'drink') NOT NULL,
  `isDirect` TINYINT(1),
  `isDelete` TINYINT(1),
  `idCategory` INT(10) NOT NULL,
  PRIMARY KEY(`idProduct`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

insert into product(productName, image, isDirect, productType, isDelete, idCategory) values ('ga heo mix rau xanh', '/media/imgs/gaHeoMixRauXanh', 1, 'food', 0, 1);

CREATE TABLE obs_db.`productPrice`(
  `idProduct` INT(10) NOT NULL,
  `productName` VARCHAR(255),
  price DOUBLE(11,2) NOT NULL,
  cost DOUBLE(11,2) NOT NULL,
  PRIMARY KEY(`idProduct`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

insert into productPrice(idProduct, productName, price, cost) values (1, 'ga heo mix rau xanh', 200000, 100000);

CREATE TABLE obs_db.area(
`idArea` INT(10) NOT NULL AUTO_INCREMENT, `areaName` VARCHAR(6),
  PRIMARY KEY(`idArea`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

insert into area(areaName) values ('tang 1');
insert into area(areaName) values ('tang 2');
insert into area(areaName) values ('tang 3');

CREATE TABLE obs_db.`table`(
  `idTable` INT(10) NOT NULL AUTO_INCREMENT,
  `tableName` VARCHAR(25),
  `isUsing` TINYINT(1) NOT NULL,
  `isDelete` TINYINT(1),
  `idArea` INT(10) NOT NULL,
  PRIMARY KEY(`idTable`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

insert into `table`(tableName, isUsing, isDelete, idArea) values ('Ban 1', 1, 0, 1);
insert into `table`(tableName, isUsing, isDelete, idArea) values ('Ban 2', 1, 0, 2);
insert into `table`(tableName, isUsing, isDelete, idArea) values ('Ban 3', 0, 1, 3);

CREATE TABLE obs_db.customer(
  `idCustomer` INT(10) NOT NULL AUTO_INCREMENT,
  `customerName` VARCHAR(111),
  `phoneNumber` INT(11),
  birthday DATE,
  sex VARCHAR(3),
  address VARCHAR(255),
  email VARCHAR(255),
  `isDelete` TINYINT(1),
  PRIMARY KEY(`idCustomer`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

insert into customer(customerName, phoneNumber, birthday, address, email, sex, isDelete) values ('Nguyễn Bảnh', 987654321, '1987-03-20', '234 An Dương Vương Quận 7', '24th@gmail.com', 'Nữ', 0);

CREATE TABLE obs_db.`order`(
  `idOrder` INT(10) NOT NULL AUTO_INCREMENT,
  `guestNumber` INT(10),
  deposit DOUBLE(11,2),
  `orderType` ENUM('preOrder', 'order') NOT NULL,
  `status` ENUM('cart', 'providing',  'success') NOT NULL,
  `idTable` INT(10),
  `idCustomer` INT(10),
  `createdAt` TIMESTAMP DEFAULT current_timestamp(),
  note VARCHAR(100),
  PRIMARY KEY(`idOrder`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX `maBan` USING BTREE ON obs_db.`order`(`idTable`);
  
insert into `order`(guestNumber, orderType, note, status, idTable, idCustomer) values (4, 'order', 'abc', 'cart', 1, 1);

CREATE TABLE obs_db.`orderDetail_1`(
  `idOrderDetail` INT(10) NOT NULL AUTO_INCREMENT,
  quantity INT(10),
  `status` ENUM('completed', 'pending', 'failed'),
  `idOrder` INT(10),
  `idProduct` INT(10) NOT NULL,
  `callTime` TIMESTAMP DEFAULT current_timestamp(),
  note VARCHAR(255),
  PRIMARY KEY(`idOrderDetail`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX `maSanPham` USING BTREE ON obs_db.`orderDetail_1`(`idOrder`);
  
  CREATE INDEX `maGioHang` USING BTREE ON obs_db.`orderDetail_1`(`idOrder`);
  
insert into orderDetail_1(quantity, note, status, idOrder, idProduct) values (1, 'ghi chu abc', 'completed', 1, 1);

CREATE TABLE obs_db.discount(
  `idDiscount` INT(10) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(255) NOT NULL,
  `discountName` VARCHAR(255),
  `description` VARCHAR(255),
  `value` INT NOT NULL,
  `discountType` ENUM('fixed amount', 'percentage') NOT NULL,
  `typeApply` ENUM('all', 'specific') NOT NULL,
  `startDate` DATE,
  `endDate` DATE,
  PRIMARY KEY(`idDiscount`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

insert into discount(code, discountName, description, startDate, endDate, typeApply, discountType, value) values ('A1234', 'giam 10k', 'duoc giam 10k', '2023-7-20', '2023-7-25', 'all', 'fixed amount', 10000);
insert into discount(code, discountName, description, startDate, endDate, typeApply, discountType, value) values ('S2345', 'giam 20k', 'duoc giam 20k', '2023-7-21', '2023-7-23', 'specific', 'fixed amount', 20000);

CREATE TABLE obs_db.`productApplied`(
`idDiscount` INT(10) NOT NULL, `idProduct` INT(10) NOT NULL,
  PRIMARY KEY(`idDiscount`, `idProduct`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

CREATE TABLE obs_db.`position`(
  `idPosition` INT(10) NOT NULL AUTO_INCREMENT,
  `positionName` VARCHAR(8),
  `basicSalary` DOUBLE(10,2),
  PRIMARY KEY(`idPosition`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

insert into `position`(positionName, basicSalary) values ('nhan vien nam 1', 40000);

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
  `idPosition` INT(10),
  `isDelete` TINYINT(1),
  PRIMARY KEY(`idStaff`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX `maChucVu` USING BTREE ON obs_db.staff(`idPosition`);
  
insert into staff(firstName, lastName, sex, phoneNumber, address, email, birthday, workingDate, idPosition, isDelete) values ('Tô Huỳnh Thiện', 'Hiếu', 'Nam', 908888329, '23 An Dương Vương 2', 'no1@gmail.com', '2000-01-01', '2023-01-30', 1, 0);

CREATE TABLE obs_db.invoice(
  `idInvoice` INT(10) NOT NULL AUTO_INCREMENT,
  `amountDiscount` DOUBLE(3,2),
  total DOUBLE(11,2),
  payment DOUBLE(11,2),
  `idStaff` INT(10) NOT NULL,
  `idOrder` INT(10) NOT NULL,
  `idDiscount` INT(10) NOT NULL,
  `createdAt` TIMESTAMP DEFAULT current_timestamp(),
  note VARCHAR(100),
  PRIMARY KEY(`idInvoice`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

insert into invoice(amountDiscount, note, total, payment, idStaff, idDiscount, idOrder) values (10000, 'ghi chu abc', 200000, 190000, 1, 1, 1);

CREATE TABLE obs_db.`invoiceDetail`(
  `idInvoiceDetail` INT(10) NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(255),
  quantity INT(10),
  price DOUBLE(10,2),
  `idProduct` INT(10) NOT NULL,
  `idInvoice` INT(10) NOT NULL,
  PRIMARY KEY(`idInvoiceDetail`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8`
  COLLATE = `utf8_general_ci`;

  CREATE INDEX `maHoaDonBan` USING BTREE ON obs_db.`invoiceDetail`
    (`idInvoice`, `idProduct`);
  
  CREATE INDEX `maSanPham` USING BTREE ON obs_db.`invoiceDetail`(`idProduct`);
  
  CREATE INDEX `maHoaDonBanHang` USING BTREE ON obs_db.`invoiceDetail`
    (`idInvoice`);
  
insert into invoiceDetail(productName, quantity, price, idProduct, idInvoice) values ('ga heo mix rau xanh', 1, 200000, 1, 1);

CREATE TABLE obs_db.category(
`idCategory` INT(10) NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(255) NOT NULL, PRIMARY KEY(`idCategory`)
) DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

insert into category(categoryName) values ('mon chinh');

ALTER TABLE obs_db.`table`
  ADD CONSTRAINT ban_ibfk_1
    FOREIGN KEY (`idArea`) REFERENCES obs_db.area (`idArea`) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE obs_db.`orderDetail_1`
  ADD CONSTRAINT chitietgiohang_ibfk_1
    FOREIGN KEY (`idOrder`) REFERENCES obs_db.`order` (`idOrder`) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE obs_db.`invoiceDetail`
  ADD CONSTRAINT chitiethoadonsanpham_ibfk_1
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`)
      ON DELETE Cascade ON UPDATE Cascade;

ALTER TABLE obs_db.`invoiceDetail`
  ADD CONSTRAINT chitiethoadonsanpham_ibfk_2
    FOREIGN KEY (`idInvoice`) REFERENCES obs_db.invoice (`idInvoice`)
      ON DELETE Cascade ON UPDATE Cascade;

ALTER TABLE obs_db.`order`
  ADD CONSTRAINT giohang_ibfk_1
    FOREIGN KEY (`idTable`) REFERENCES obs_db.`table` (`idTable`) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE obs_db.invoice
  ADD CONSTRAINT hoadonbanhang_ibfk_1
    FOREIGN KEY (`idStaff`) REFERENCES obs_db.staff (`idStaff`) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE obs_db.staff
  ADD CONSTRAINT nhanvien_ibfk_1
    FOREIGN KEY (`idPosition`) REFERENCES obs_db.`position` (`idPosition`)
      ON DELETE Cascade ON UPDATE Cascade;

ALTER TABLE obs_db.`order`
  ADD CONSTRAINT khachhang_giohang
    FOREIGN KEY (`idCustomer`) REFERENCES obs_db.customer (`idCustomer`);

ALTER TABLE obs_db.receipt
  ADD CONSTRAINT `nhacungcap_phieuNhap`
    FOREIGN KEY (`idSupplier`) REFERENCES obs_db.supplier (`idSupplier`);

ALTER TABLE obs_db.ingredient
  ADD CONSTRAINT `phieuNhap_nguyenLieu`
    FOREIGN KEY (`idReceipt`) REFERENCES obs_db.receipt (`idReceipt`);

ALTER TABLE obs_db.warehouse
  ADD CONSTRAINT `phieuNhap_kho`
    FOREIGN KEY (`idReceipt`) REFERENCES obs_db.receipt (`idReceipt`);

ALTER TABLE obs_db.`productPrice`
  ADD CONSTRAINT `sanpham_giaSanPham`
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`);

ALTER TABLE obs_db.invoice
  ADD CONSTRAINT `donHang_hoadonbanhang`
    FOREIGN KEY (`idOrder`) REFERENCES obs_db.`order` (`idOrder`);

ALTER TABLE obs_db.`receiptDetail`
  ADD CONSTRAINT `phieuNhap_chiTietPhieuNhap`
    FOREIGN KEY (`idReceipt`) REFERENCES obs_db.receipt (`idReceipt`);

ALTER TABLE obs_db.recipe
  ADD CONSTRAINT `sanpham_congThuc`
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`);

ALTER TABLE obs_db.`orderDetail_1`
  ADD CONSTRAINT `sanpham_chiTietDonHang_1`
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`);

ALTER TABLE obs_db.invoice
  ADD CONSTRAINT `giamGia_hoadonbanhang`
    FOREIGN KEY (`idDiscount`) REFERENCES obs_db.discount (`idDiscount`);

ALTER TABLE obs_db.recipe
  ADD CONSTRAINT `nguyenLieu_congThuc`
    FOREIGN KEY (`idIngredient`) REFERENCES obs_db.ingredient (`idIngredient`);

ALTER TABLE obs_db.`productApplied`
  ADD CONSTRAINT `giamGia_sanPhamApDung`
    FOREIGN KEY (`idDiscount`) REFERENCES obs_db.discount (`idDiscount`);

ALTER TABLE obs_db.`productApplied`
  ADD CONSTRAINT `sanpham_sanPhamApDung`
    FOREIGN KEY (`idProduct`) REFERENCES obs_db.product (`idProduct`);

ALTER TABLE obs_db.product
  ADD CONSTRAINT category_product
    FOREIGN KEY (`idCategory`) REFERENCES obs_db.category (`idCategory`);
