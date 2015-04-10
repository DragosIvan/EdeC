$.post("api/familyDetails",
	// window.parent.family
	// JSON Dummy Object Begin
	{
    "EffectiveDate": 1415714721,
    "ZipCode": "92806",
    "CountyName": null,
    "State": "MA",
    "HouseholdMAGI": null,
    "HouseholdSize": 0,
    "Members": [
      {
        "MemberID": "1",
        "MemberType": "Subscriber",
        "FirstName" : "FirstName",
        "LastName" : "LastName", 
        "RelationshipType": "1",
        "DateOfBirth": 1902411,
        "Gender": "Male",
        "IsSmoker": 0,
        "DateLastSmoked": null, 
        "LiveinHousehold": 1,
        "ZipCode": "92806",
        "CountyName": null
      },
      { 
        "MemberID": "2",
        "MemberType": "Spouse",
        "FirstName" : "FirstName",
        "LastName" : "LastName", 
        "RelationshipType": "19",
        "DateOfBirth": 1902411,
        "Gender": "Female",
        "IsSmoker": 0,
        "DateLastSmoked": null,
        "LiveinHousehold": 1,
        "ZipCode": "92806",
        "CountyName": null
      },
      {
        "MemberID": "3",
        "MemberType": "Dependent",
        "FirstName" : "FirstName",
        "LastName" : "LastName",
        "RelationshipType": "3",
        "DateOfBirth": 1902411,
        "Gender": "Male",
        "IsSmoker": 0,
        "DateLastSmoked": null,
        "LiveinHousehold": 1,
        "ZipCode": "50009",
        "CountyName": null
      },
      {
        "MemberID": "4",
        "MemberType": "Dependent",
        "FirstName" : "FirstName",
        "LastName" : "LastName",
        "RelationshipType": "3",
        "DateOfBirth": 1902411,
        "Gender": "Male",
        "IsSmoker": 0,
        "DateLastSmoked": null,
        "LiveinHousehold": 1,
        "ZipCode": "92806",
        "CountyName": null
      }]
  	}
  	// JSON Dummy Object End
);