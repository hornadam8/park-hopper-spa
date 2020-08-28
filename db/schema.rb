# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_28_092407) do

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.integer "park_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["park_id"], name: "index_comments_on_park_id"
  end

  create_table "parks", force: :cascade do |t|
    t.string "name"
    t.string "link"
    t.string "location"
    t.string "description"
    t.string "information"
    t.string "weather"
    t.string "tours_and_camping"
    t.string "wildlife"
    t.string "nearby_parks"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "image"
    t.integer "likes", default: 0
  end

  add_foreign_key "comments", "parks"
end
