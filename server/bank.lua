local ox_inventory = exports.ox_inventory

local function provideExport(exportName, func)
	AddEventHandler(("__cfx_export_vl_banking_%s"):format(exportName), function(setCB)
		setCB(func)
	end)
end

local function checkAmount(amount)
    if amount and type(amount) == "number" and amount > 0 then
	return true
    else
	return false
    end
end

---@param source number server id to identify the player
---@param amount number
function depositCash(source, amount)
    if source == nil or source == "" then return end
	if checkAmount(amount) then
		local money = ox_inventory:Search(source, 2, "money")

	if money and money >= amount then
	    local accounts = Ox.GetPlayer(source).getAccounts()
	    accounts.add("fleeca", amount)
	    ox_inventory:RemoveItem(source, "money", amount)
	end
	else
	print(GetPlayerName(source) .. " is sketchy")
    end
end
provideExport("deposit", depositCash)

---@param source number server id to identify the player
---@param amount number
function withdrawCash(source, amount)
    if source == nil or source == "" then return end
	if checkAmount(amount) then
	local accounts = Ox.GetPlayer(source).getAccounts()
		local fleeca = accounts.get("fleeca")

	if fleeca >= amount then
	    accounts.remove("fleeca", amount)
	    ox_inventory:AddItem(source, "money", amount)
	end
	else
	print(GetPlayerName(source) .. " is sketchy")
    end
end
provideExport("withdraw", withdrawCash)

---@param source number server id to identify the player
---@param to number server id to identify the player
---@param amount number
function transferMoney(source, to, amount)
    if source == nil or source == "" or to == nil or to == "" then return end
    local name = GetPlayerName(to)
    if name then
	if checkAmount(amount) then
	    local accounts = Ox.GetPlayer(source).getAccounts()
	    local fleeca = accounts.get("fleeca")

	    if fleeca and fleeca >= amount then
		local target = Ox.GetPlayer(to).getAccounts()
		target.add("fleeca", amount)
		accounts.remove("fleeca", amount)
	    end
	else
	    print(GetPlayerName(source) .. " is sketchy")
	end
    else
	print("Player is not online")
    end
end
provideExport("transfer", transferMoney)
