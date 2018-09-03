-- -----------------------------------------------------
-- Schema notificacao
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema notificacao
-- -----------------------------------------------------
CREATE SCHEMA "notificacao";

-- -----------------------------------------------------
-- Table "notificacao"."usuario"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "notificacao"."usuario" (
  "usuario_id" SERIAL NOT NULL,
  "descricao" TEXT NULL,
  PRIMARY KEY ("usuario_id"))
;


-- -----------------------------------------------------
-- Table "notificacao"."sistema"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "notificacao"."sistema" (
  "sistema_id" SERIAL NOT NULL,
  "descricao" TEXT NULL,
  PRIMARY KEY ("sistema_id"))
;


-- -----------------------------------------------------
-- Table "notificacao"."tipo_notificacao"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "notificacao"."tipo_notificacao" (
  "tipo_notificacao_id" SERIAL NOT NULL,
  "descricao" VARCHAR(255) NULL,
  "mensagem" TEXT NULL,
  "sistema_id" INT NOT NULL,
  "autor_id" INT NOT NULL,
  PRIMARY KEY ("tipo_notificacao_id"),
  CONSTRAINT "fk_tipo_notificacao_sistema1"
  FOREIGN KEY ("sistema_id")
  REFERENCES "notificacao"."sistema" ("sistema_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT "fk_tipo_notificacao_usuario1"
  FOREIGN KEY ("autor_id")
  REFERENCES "notificacao"."usuario" ("usuario_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
;

CREATE INDEX "fk_tipo_notificacao_sistema1_idx" ON "notificacao"."tipo_notificacao" ("sistema_id");

CREATE INDEX "fk_tipo_notificacao_usuario1_idx" ON "notificacao"."tipo_notificacao" ("autor_id");


-- -----------------------------------------------------
-- Table "notificacao"."notificacao"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "notificacao"."notificacao" (
  "notificacao_id" SERIAL NOT NULL,
  "destinatario_id" INT NOT NULL,
  "tipo_notificacao_id" INT NOT NULL,
  "is_notificacao_lida" BOOLEAN NULL,
  "data_envio" TIMESTAMP NULL,
  PRIMARY KEY ("notificacao_id"),
  CONSTRAINT "fk_notificacao_usuario1"
  FOREIGN KEY ("destinatario_id")
  REFERENCES "notificacao"."usuario" ("usuario_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT "fk_notificacao_tipo_notificacao1"
  FOREIGN KEY ("tipo_notificacao_id")
  REFERENCES "notificacao"."tipo_notificacao" ("tipo_notificacao_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
;

CREATE INDEX "fk_notificacao_usuario1_idx" ON "notificacao"."notificacao" ("destinatario_id");

CREATE INDEX "fk_notificacao_tipo_notificacao1_idx" ON "notificacao"."notificacao" ("tipo_notificacao_id");


-- -----------------------------------------------------
-- Table "notificacao"."plataforma"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "notificacao"."plataforma" (
  "plataforma_id" SERIAL NOT NULL,
  "descricao" TEXT NULL,
  PRIMARY KEY ("plataforma_id"))
;


-- -----------------------------------------------------
-- Table "notificacao"."tipo_notificacao_has_plataforma"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "notificacao"."tipo_notificacao_has_plataforma" (
  "tipo_notificacao_tipo_notificacao_id" SERIAL NOT NULL,
  "plataforma_plataforma_id" INT NOT NULL,
  PRIMARY KEY ("tipo_notificacao_tipo_notificacao_id", "plataforma_plataforma_id"),
  CONSTRAINT "fk_tipo_notificacao_has_plataforma_tipo_notificacao1"
  FOREIGN KEY ("tipo_notificacao_tipo_notificacao_id")
  REFERENCES "notificacao"."tipo_notificacao" ("tipo_notificacao_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT "fk_tipo_notificacao_has_plataforma_plataforma1"
  FOREIGN KEY ("plataforma_plataforma_id")
  REFERENCES "notificacao"."plataforma" ("plataforma_id")
  ON DELETE NO ACTION
  ON UPDATE NO ACTION)
;

CREATE INDEX "fk_tipo_notificacao_has_plataforma_plataforma1_idx" ON "notificacao"."tipo_notificacao_has_plataforma" ("plataforma_plataforma_id");

CREATE INDEX "fk_tipo_notificacao_has_plataforma_tipo_notificacao1_idx" ON "notificacao"."tipo_notificacao_has_plataforma" ("tipo_notificacao_tipo_notificacao_id");

ALTER TABLE notificacao.plataforma ADD is_ativo boolean DEFAULT false NOT NULL;

ALTER TABLE notificacao.usuario ADD is_ativo boolean DEFAULT false  NOT NULL;

ALTER TABLE notificacao.sistema ADD is_ativo boolean DEFAULT false  NOT NULL;

