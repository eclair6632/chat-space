# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string||
|email|string|null: false|
|password|string|null: false|

## Association
- has_many :messeages
- has_many :groups-users
- has_many :groups, through: :groups_users

## messeagesグループ
|Column|Type|Options|
|------|----|-------|
|messeage|text||
|image|integer||
|user_id|references|null:false, foreign_key: true|
|group_id|references|null:false, foreign_key: true|

## Associationグループ
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|

## Association
- how_many groups_users
- how_many users, through: groups_users
- how_many messeages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user