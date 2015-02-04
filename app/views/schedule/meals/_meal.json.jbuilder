json.id meal.id
json.date meal.date
json.position meal.position

json.meal do
  json.(meal.meal, :id, :title, :serves, :time, :created_at, :updated_at, :active)
end

# json.ingredients do
#   json.array! meal.ingredients, partial: 'ingredients/ingredient', as: :ingredient
# end

json.user do
  json.partial! 'users/user', user: meal.user
end
