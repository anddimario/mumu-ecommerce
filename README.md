# mumu-ecommerce - Ecommerce microservice for mumu

### Requirements and installation
mumu[https://github.com/anddimario/mumu] and ArangoDB[https://www.arangodb.com/] ^3.0.4    
After you've installed the service, edit the configuration variables, here an example for sites 
variable:
```
{ 
  "hostnames":["localhost","127.0.0.1"], 
  "roles": ["user"]
}
```
*jwtSecret* must be the same of mumu.     
*mainAppPrefix* must be the prefix of the main app, for example, if you call the main app "mumu" the collection prefix must be "mumu_" and this is the value for this configuration parameter.

# License

Copyright (c) 2016 Andrea Di Mario

License: MIT
