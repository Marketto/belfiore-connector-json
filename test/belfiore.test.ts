import BelfioreConnector from "../src/";
import { expect } from "./utils";
import sourceSample from "./source-sample.json";

const belfioreConnector = new BelfioreConnector(sourceSample);

describe("Belfiore", () => {
	describe("Belfiore", () => {
		describe("belfioreConnector.findByCode()", () => {
			it("Should return Rome for H501", async () => {
				const place = await belfioreConnector.findByCode("H501");
				place?.name?.should.be.equalIgnoreCase("ROMA");
			});
			it("Should return Bari for a662", async () => {
				const place = await belfioreConnector.findByCode("a662");
				place?.name?.should.be.equalIgnoreCase("BARI");
			});
		});
		describe("Belfiore place", () => {
			it("Should return code H501 for H501", async () => {
				const place = await belfioreConnector.findByCode("H501");
				place?.belfioreCode.should.be.equal("H501");
				place?.creationDate?.getFullYear().should.be.equal(1884);
				place?.expirationDate?.getFullYear().should.be.equal(9999);
				place?.province?.should.be.equal("RM");
				place?.dataSource?.should.be.an("object");
			});
		});
		describe("belfioreConnector.toArray()", () => {
			it("Should return an Array of places", async function () {
				this.timeout(5000);
				expect(await belfioreConnector.toArray()).to.be.an("array");
			});
			it("Should have different elements", async function () {
				this.timeout(5000);
				const belfioreList = await belfioreConnector.toArray();
				belfioreList[10].belfioreCode.should.be.not.equal(
					belfioreList[11].belfioreCode
				);
				belfioreList[10].name.should.be.not.equal(belfioreList[11].name);
				belfioreList[32].belfioreCode.should.be.not.equal(
					belfioreList[632].belfioreCode
				);
				belfioreList[32].name.should.be.not.equal(belfioreList[632].name);
			});
		});
		describe("belfioreConnector.findByName()", () => {
			it("Should return Rome", async () => {
				const place = await belfioreConnector.findByName("Roma");
				expect(place).to.be.ok;
				if (place) {
					place.name.should.be.equalIgnoreCase("ROMA");
				}
			});
			it("Should return the first entry of a dataset (Cecoslovacchia)", async () => {
				const place = await belfioreConnector.findByName("Cecoslovacchia");
				expect(place).to.be.ok;
				if (place) {
					place.name.should.be.equalIgnoreCase("Cecoslovacchia");
				}
			});

			it("Should return the last entry of a dataset (Sud Sudan)", async () => {
				const place = await belfioreConnector.findByName("Sud Sudan");
				expect(place).to.be.ok;
				if (place) {
					place.name.should.be.equalIgnoreCase("SUD SUDAN");
				}
			});
		});
	});

	describe("belfioreConnector.cities", () => {
		describe("belfioreConnector.findByCode()", () => {
			it("Should return Bari for A662", async () => {
				const place = await belfioreConnector.cities?.findByCode("A662");
				place?.name.should.be.equalIgnoreCase("BARI");
			});
		});
		describe("belfioreConnector.cities", () => {
			it("Should return cities by RM province", async () => {
				const subConnector = belfioreConnector.cities?.byProvince("RM");
				expect(subConnector).to.be.ok;
				const places = await subConnector?.toArray();
				places?.some((place) => place.province !== "RM").should.be.false;
			});

			it("Should throw an error for province not matching 2 letters code", () => {
				try {
					belfioreConnector.cities?.byProvince("@3");
				} catch (err) {
					err?.should?.be?.an("Error");
				}
			});
		});
	});

	describe("belfioreConnector.countries", () => {
		describe("belfioreConnector.findByCode()", () => {
			it("Should return Federazione russa for Z154", async () => {
				const place = await belfioreConnector.countries?.findByCode("Z154");
				place?.name.should.be.equalIgnoreCase("Federazione russa");
			});
		});
	});

	describe("belfioreConnector.provinces", () => {
		it("Should returns a list Italian province codes", async function () {
			this.timeout(5000);
			const provinces = await belfioreConnector.provinces;
			provinces.should.include.members([
				"CO",
				"TO",
				"FU",
				"VA",
				"PT",
				"BZ",
				"MC",
				"BS",
				"LE",
				"MI",
				"NO",
				"VC",
				"TN",
				"GO",
				"CS",
				"CE",
				"CN",
				"BG",
				"TS",
				"PL",
				"AL",
				"GE",
				"MS",
				"PV",
				"AQ",
				"CA",
				"PN",
				"IM",
				"PU",
				"VR",
				"VT",
				"BO",
				"PI",
				"AO",
				"VI",
				"FI",
				"SV",
				"NA",
				"CR",
				"ME",
				"AV",
				"RO",
				"FE",
				"MN",
				"PR",
				"VE",
				"RE",
				"BN",
				"LO",
				"PC",
				"BI",
				"UD",
				"SO",
				"PS",
				"BA",
				"RC",
				"SA",
				"PD",
				"AN",
				"AR",
				"PE",
				"BL",
				"CB",
				"RM",
				"PZ",
				"VB",
				"TR",
				"AT",
				"TV",
				"LU",
				"CH",
				"FO",
				"CT",
				"LC",
				"NU",
				"ZA",
				"RI",
				"SI",
				"RN",
				"PG",
				"AP",
				"CZ",
				"SS",
				"RG",
				"LI",
				"OR",
				"FG",
				"MT",
				"FR",
				"VV",
				"CL",
				"IS",
				"EN",
				"MB",
				"AG",
				"TE",
				"TP",
				"RA",
				"PA",
				"FM",
				"SP",
				"BT",
				"LT",
				"SU",
				"GR",
				"SR",
				"TA",
				"FC",
				"MO",
				"KR",
				"BR",
				"PO",
			]);
		});
	});

	describe("belfioreConnector Proxy pitfalls", () => {
		describe("Should return undefined", () => {
			it("countries.cities", () => {
				expect(belfioreConnector.countries?.cities).to.be.undefined;
			});
			it("cities.countries", () => {
				expect(belfioreConnector.cities?.countries).to.be.undefined;
			});
			it("byProvince().countries", async () => {
				const provinces = await belfioreConnector.byProvince("VV");
				expect(provinces).to.be.ok;
				if (provinces) {
					expect(provinces.countries).to.be.undefined;
				}
			});
		});
	});

	describe("belfioreConnector.active", () => {
		describe("belfioreConnector.active().findByCode()", () => {
			it("Should return Bologna for A944", async () => {
				const place = await belfioreConnector.active().findByCode("A944");
				place?.name.should.be.equalIgnoreCase("BOLOGNA");
			});
			/*
			it("Should return null for D620 today", async () => {
				const place = await belfioreConnector.active().findByCode("D620");
				expect(place).to.be.not.ok;
			});
			*/
			it("Should return FIUME for D620 in 1933", async () => {
				const place = await belfioreConnector.active([1933]).findByCode("D620");
				place?.name.should.be.equalIgnoreCase("FIUME");
			});
			/*
			it("Should throws Error for D620 in 2000", async () => {
				const place = await belfioreConnector.active([2000]).findByCode("D620");
				expect(place).to.be.not.ok;
			});
			*/
		});
		describe("belfioreConnector.cities.active()", () => {
			/*
			it("Should not contains D620 (Fiume)", async () => {
				const place = await belfioreConnector.cities
					?.active()
					.findByCode("D620");
				expect(place).to.be.not.ok;
			});
			*/
			it("Should contains D620 (Fiume) passing 1933 as active date", async () => {
				const place = await belfioreConnector.cities
					?.active([1933])
					.findByCode("D620");
				place?.name.should.be.equalIgnoreCase("FIUME");
			});
		});
	});

	describe("belfioreConnector.from", () => {
		describe("belfioreConnector.from()[belfioreCode]", () => {
			const connector1933 = belfioreConnector.from([1933]);
			it("Should return FIUME for D620 from 1933", async () => {
				const place = await connector1933.findByCode("D620");
				place?.name.should.be.equalIgnoreCase("FIUME");
			});
			it("Should find Federazione Russa from 1933", async () => {
				const place = await connector1933.findByCode("Z154");
				place?.name.should.be.equalIgnoreCase("Federazione Russa");
			});
		});
	});
});
