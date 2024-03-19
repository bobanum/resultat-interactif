<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.w3.org/2000/svg">
	<xsl:import href="../../src/IndicatorUtils.xsl"/>
	<xsl:param name="width" select="100"/>
	<xsl:param name="height" select="200"/>
	<!-- <xsl:output method="xml" indent="yes" encoding="UTF-8"/> -->
	<xsl:template match="/">
		<xsl:apply-templates/>
	</xsl:template>
	<xsl:template match="layer">
		<svg viewBox="0 0 {$width} {$height}">
			<xsl:apply-templates/>
		</svg>
	</xsl:template>
	<xsl:template match="dimension">
		<xsl:variable name="x">
			<xsl:call-template name="x"/>
		</xsl:variable>
		<xsl:variable name="y">
			<xsl:call-template name="bottom"/>
		</xsl:variable>
		<xsl:variable name="width">
			<xsl:call-template name="width"/>
		</xsl:variable>
		<xsl:variable name="height">
			<xsl:call-template name="height"/>
		</xsl:variable>
		<xsl:variable name="right" select="$x+$width"/>
		<xsl:variable name="bottom" select="$y+$height"/>

		<g transform="translate(0, {$height})" color="var(--color)" font-size="24">
			<g stroke="currentColor" stroke-width="3" marker-start="url(#marker-arrow-bar)" marker-end="url(#marker-arrow-bar)">
				<path d="M {$x+5} 0 h 600"/>
				<path d="M {$right+-5} 0 h -600"/>
			</g>
			<foreignObject width="{$width}" x="{$x}" y="-25" height="50">
				<div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%;height:100%; display:grid;grid-template-columns:45ch;text-align:center;background-color:#0000;justify-content:center; align-content:center;">
					<xsl:value-of select="legend"/>
				</div>
			</foreignObject>
		</g>
	</xsl:template>
	<xsl:template match="body">
		<svg viewBox="0 0 0 0" style="color:var(--color)" stroke="currentColor" stroke-width="0">
			<style>
				:root {
					--color: cyan;
				}
			</style>
			<defs fill="currentColor">
				<marker id="marker-triangle" viewBox="0 0 10 10" refX="-2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
					<path d="M 0 0 L 5 5 L 0 10 z" />
				</marker>
				<marker id="marker-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
					<path d="M 5,0 4,1 8,5 4,9 5,10 10,5 Z" />
				</marker>
				<marker id="marker-arrow-bar" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
					<path fill-rule="nonzero" d="M 4,0 l-1,1 4,4 -4,4 1,1 5,-5 Z M 10,0 l -1.586,0 0,10 1.586,0 0,10" />
				</marker>
				<marker id="marker-bar" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
					<path fill-rule="nonzero" d="M 8,0 l -1.586,0 0,10 1.586,0 0,10" />
				</marker>
			</defs>
		</svg>
	</xsl:template>
</xsl:stylesheet>