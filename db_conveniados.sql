IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'Conveniados')
BEGIN
	CREATE DATABASE [Conveniados]
END
GO

USE [conveniados];
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuarios' and xtype='U')
BEGIN
	CREATE TABLE Usuarios
	(
		IdUser INT IDENTITY(1,1),
		Username VARCHAR(60),
		UserPassword VARCHAR(255)
	);
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Conveniados' and xtype='U')
BEGIN
	CREATE TABLE Conveniados
	(
		IdConveniado INT IDENTITY(1,1),
		Nome VARCHAR(60) NOT NULL,
		Endereco VARCHAR(255) NOT NULL,
		Telefone VARCHAR(255) NOT NULL

		CONSTRAINT PK_Conveniado PRIMARY KEY (IdConveniado),
	);
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tags' and xtype='U')
BEGIN
	CREATE TABLE Tags
	(
		IdTag INT IDENTITY(1,1),
		Nome VARCHAR(60)

		CONSTRAINT PK_Tag PRIMARY KEY (IdTag)
	);
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ConveniadosXTags' and xtype='U')
BEGIN
	CREATE TABLE ConveniadosXTags
	(
		IdConveniado INT NOT NULL,
		IdTag INT NOT NULL,
	
		CONSTRAINT PK_ConveniadosXTags PRIMARY KEY (IdConveniado, IdTag),
		CONSTRAINT FK_ConveniadoTag FOREIGN KEY (IdConveniado) REFERENCES Conveniados (IdConveniado),
		CONSTRAINT FK_TagConveniado FOREIGN KEY (IdTag) REFERENCES Tags (IdTag)
	);
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Descontos' and xtype='U')
BEGIN
	CREATE TABLE Descontos
	(
		IdDesconto INT IDENTITY(1,1),
		IdConveniado INT NOT NULL,
		Valor SMALLINT NOT NULL,
		Descricao VARCHAR(255)
	)
END

INSERT INTO Tags (Nome) VALUES ('Academia'),('Alimentação'),('Agência');

INSERT INTO Conveniados (Nome, Endereco, Telefone ) VALUES 
	('Academia Studio Fit', 'Rua Majos Gote, 478', '(34) 3821-4982'),
	('Academia Evolution', 'Rua Majos Gote, 478', '(34) 3821-4982'),
	('Ascender Inteligência Empresarial', 'Rua Majos Gote, 478', '(34) 3821-4982'),
	('Padaria Vesúvio', 'Rua Majos Gote, 478', '(34) 3821-4982');

INSERT INTO ConveniadosXTags(IdConveniado, IdTag) VALUES
	('1','1'), ('2','1'), ('3','1'), ('4','2');

INSERT INTO Descontos(IdConveniado, Valor, Descricao) VALUES
	('1','15','na mensalidade para 1 modalidade'), ('1','25','na mensalidade para 1 modalidade'), 
	('2','15','na mensalidade para 1 modalidade'), ('2','25','na mensalidade para 1 modalidade'),
	('3','5','na mensalidade para 1 modalidade');