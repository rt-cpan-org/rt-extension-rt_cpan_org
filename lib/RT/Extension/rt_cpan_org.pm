# BEGIN BPS TAGGED BLOCK {{{
# 
# COPYRIGHT:
#  
# This software is Copyright (c) 1996-2007 Best Practical Solutions, LLC 
#                                          <jesse@bestpractical.com>
# 
# (Except where explicitly superseded by other copyright notices)
# 
# 
# LICENSE:
# 
# This work is made available to you under the terms of Version 2 of
# the GNU General Public License. A copy of that license should have
# been provided with this software, but in any event can be snarfed
# from www.gnu.org.
# 
# This work is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
# 02110-1301 or visit their web page on the internet at
# http://www.gnu.org/copyleft/gpl.html.
# 
# 
# CONTRIBUTION SUBMISSION POLICY:
# 
# (The following paragraph is not intended to limit the rights granted
# to you to modify and distribute this software under the terms of
# the GNU General Public License and is only of importance to you if
# you choose to contribute your changes and enhancements to the
# community by submitting them to Best Practical Solutions, LLC.)
# 
# By intentionally submitting any modifications, corrections or
# derivatives to this work, or any other work intended for use with
# Request Tracker, to Best Practical Solutions, LLC, you confirm that
# you are the copyright holder for those contributions and you grant
# Best Practical Solutions,  LLC a nonexclusive, worldwide, irrevocable,
# royalty-free, perpetual, license to use, copy, create derivative
# works based on those contributions, and sublicense and distribute
# those contributions and any derivatives thereof.
# 
# END BPS TAGGED BLOCK }}}

use 5.008003;
use strict;
use warnings;

package RT::Extension::rt_cpan_org;

our $VERSION = '4.0';

=head1 NAME

RT::Extension::rt_cpan_org - The customizations that turn a RT into a RT for rt.cpan.org

=head1 DESCRIPTION

=head1 OVERLAYS AND CUSTOMIZATIONS

=head2 autohandler

=over 4

=item * C<$goto> argument

=item * C<$nossl> argument and redirect to https in some
cases

=item * rewriting Web* options depending on schema (http/https)

=item * XXX: old code was disabling everything related to
SelfService. Not sure why. Should be checked.

=back

=cut

# there is no sense in overriding default queue for rt.cpan.org
require RT::Config;
$RT::Config::META{'DefaultQueue'}{'Overridable'} = 0;
$RT::Config::META{'UsernameFormat'}{'Overridable'} = 0;

$RT::Config::META{'WebDefaultStylesheet'}{'WidgetArguments'}{'Values'} = [
    qw(rt.cpan.org-web2 rt.cpan.org-3.5 rt.cpan.org-3.4)
];

require RT::Interface::Web;
package RT::Interface::Web;

no warnings 'redefine';
sub ShowRequestedPage {
    my $ARGS = shift;

    my $m = $HTML::Mason::Commands::m;

    SendSessionCookie();

    # precache all system level rights for the current user
    $HTML::Mason::Commands::session{CurrentUser}->PrincipalObj->HasRights( Object => RT->System );

    return $m->comp(
        { base_comp => $m->request_comp },
        $m->fetch_next,
        %$ARGS
    );
}

=head1 AUTHOR

Thomas Sibley E<lt>trs@bestpractical.comE<gt>

=head1 LICENSE

GPL version 2.

=cut

1;
