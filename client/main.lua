local ATMProps = {
	`prop_atm_01`,
	`prop_atm_02`,
	`prop_atm_03`,
	`prop_fleeca_atm`,
	`v_5_b_atm1`,
	`v_5_b_atm2`
}

local function openBank()
	lib.callback("vl_banking:getData", 1000, function(data)
		SetNuiFocus(true, true)
		SendNUIMessage({
			type = "open",
			money = data.money,
			balance = data.balance,
			players = json.encode(data.players),
		})
	end)
end

local ox_target = exports.ox_target
ox_target:addModel(ATMProps, {
	{
		name = "access_account",
		icon = "fas fa-credit-card",
		label = "Access ATM",
		onSelect = function()
			openBank()
		end,
	},
})