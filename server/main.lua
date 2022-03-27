local ox_inventory = exports.ox_inventory

RegisterNetEvent('ox_vl_banking:deposit', function(data)
    exports.ox_vl_banking:deposit(source, tonumber(data.amount))
end)

RegisterNetEvent('ox_vl_banking:withdraw', function(data)
    exports.ox_vl_banking:withdraw(source, tonumber(data.amount))
end)

RegisterNetEvent('ox_vl_banking:transfer', function(data)
    exports.ox_vl_banking:transfer(source, tonumber(data.to), tonumber(data.amount))
end)

lib.callback.register('ox_vl_banking:getData', function(source)
    local data = {}
    local money = ox_inventory:Search(source, 2, 'money') or 0
    local balance = exports.ox_accounts:get(source, 'bank') or 0
    local players = GetPlayers()

    data = {
        money = money,
        balance = balance,
        players = players
    }

    return data
end)
