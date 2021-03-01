use lib '.';
use inc::Module::Install;

RTx('RT-Extension-rt_cpan_org');
repository('https://github.com/rt-cpan-org/rt-extension-rt_cpan_org');

requires_rt('5.0.0');

# rt-cpan-export-db
requires 'DBI';
requires 'DBD::SQLite';
requires 'IO::Compress::Gzip';
requires 'File::Spec';
requires 'File::Remove';
requires 'JSON';
requires 'JSON::XS';

sign();
WriteAll();
